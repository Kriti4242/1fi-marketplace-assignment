import assert from 'node:assert';
import { formatCurrency, formatDiscount, formatEmiDate } from '../src/utils/formatters.js';
import { calculateEmi, generateEmiPlans, getStartingEmi } from '../src/utils/emiCalculator.js';
import { marketplaceService, setSimulateError } from '../src/services/marketplaceService.js';
import { MOCK_PRODUCTS, CATEGORIES } from '../src/data/mockProducts.js';

console.log('--- STARTING 1FI MARKETPLACE VERIFICATION TESTS ---');

// 1. FORMATTERS TESTS
console.log('\n[1] Testing Formatters...');
assert.strictEqual(formatCurrency(79900).replace(/\s/g, ''), '₹79,900'.replace(/\s/g, ''));
assert.strictEqual(formatCurrency(0).replace(/\s/g, ''), '₹0'.replace(/\s/g, ''));
assert.strictEqual(formatDiscount(15), '15% OFF');
assert.strictEqual(formatDiscount(0), null);
assert.ok(typeof formatEmiDate(new Date()) === 'string');
console.log('✓ Formatters passed');

// 2. NO-COST EMI CALCULATION ENGINE TESTS
console.log('\n[2] Testing No-Cost EMI Engine...');
const noCost3M = calculateEmi({ principal: 79900, tenureMonths: 3, isNoCost: true });
assert.strictEqual(noCost3M.monthlyAmount, Math.ceil(79900 / 3)); // 26634
assert.strictEqual(noCost3M.annualInterestRate, 0);
assert.strictEqual(noCost3M.totalInterest, 0);
assert.strictEqual(noCost3M.isNoCost, true);
assert.ok(noCost3M.interestDiscount > 0);

const noCost12M = calculateEmi({ principal: 79900, tenureMonths: 12, isNoCost: true });
assert.strictEqual(noCost12M.monthlyAmount, Math.ceil(79900 / 12)); // 6659
assert.strictEqual(noCost12M.totalInterest, 0);
console.log('✓ No-Cost EMI formulas passed');

// 3. STANDARD EMI CALCULATION ENGINE TESTS
console.log('\n[3] Testing Standard EMI Engine...');
const standard18M = calculateEmi({ principal: 79900, tenureMonths: 18, annualInterestRate: 12, isNoCost: false });
assert.strictEqual(standard18M.annualInterestRate, 12);
assert.ok(standard18M.totalInterest > 0);
assert.ok(standard18M.totalPayable > 79900);
console.log('✓ Standard reducing balance EMI formulas passed');

// 4. DYNAMIC EMI PLAN GENERATOR TESTS
console.log('\n[4] Testing Dynamic Plan Generator...');
const plans = generateEmiPlans({ price: 79900, supportedTenures: [3, 6, 9, 12, 18, 24], noCostTenures: [3, 6, 12] });
assert.strictEqual(plans.length, 6);
const plan12 = plans.find(p => p.duration === 12);
assert.ok(plan12);
assert.strictEqual(plan12.isNoCost, true);
assert.strictEqual(plan12.interestRate, 0);

const startingEmi = getStartingEmi(79900, [3, 6, 9, 12], [3, 6, 9, 12]);
assert.strictEqual(startingEmi, Math.ceil(79900 / 12));
console.log('✓ Dynamic Plan Generator passed');

// 5. MARKETPLACE SERVICE & SEARCH/FILTER TESTS
console.log('\n[5] Testing Marketplace Service...');
async function runServiceTests() {
  // Test All Products
  const allProds = await marketplaceService.getProducts();
  assert.ok(allProds.length >= 8, 'Expected at least 8 products');

  // Test Category Filtering
  const mobiles = await marketplaceService.getProducts({ category: 'mobiles' });
  assert.ok(mobiles.length > 0);
  assert.ok(mobiles.every(p => p.category === 'mobiles'));

  // Test Search Query
  const iphoneSearch = await marketplaceService.getProducts({ query: 'iPhone' });
  assert.ok(iphoneSearch.length > 0);
  assert.ok(iphoneSearch.some(p => p.name.includes('iPhone')));

  // Test Get Product By ID
  const iphone = await marketplaceService.getProductById('prod-iphone-16');
  assert.strictEqual(iphone.id, 'prod-iphone-16');
  assert.ok(iphone.variants.storage.length >= 3);
  assert.ok(iphone.variants.color.length >= 3);

  // Test Variant Price Recalculation via Service
  const variantPrice = iphone.basePrice + 10000; // 256GB
  const dynamicPlans = await marketplaceService.getEmiPlans(iphone.id, variantPrice);
  const planForVariant = dynamicPlans.find(p => p.duration === 12);
  assert.strictEqual(planForVariant.monthlyAmount, Math.ceil(89900 / 12));

  // Test Order Submission
  const order = await marketplaceService.submitOrder({
    productId: iphone.id,
    variantDetails: { storage: { label: '256 GB' } },
    emiPlan: planForVariant,
    userPhone: '+91 1234567898',
  });
  assert.ok(order.orderId.startsWith('1FI-'));
  assert.ok(order.loanId.startsWith('LOAN-MF-'));
  assert.strictEqual(order.status, 'APPROVED');
  assert.strictEqual(order.emiPlan.duration, 12);

  // Test Error Simulation & Recovery
  console.log('\n[6] Testing Error Simulation & Recovery...');
  setSimulateError(true);
  try {
    await marketplaceService.getProducts();
    assert.fail('Should have thrown simulated error');
  } catch (err) {
    assert.ok(err.message.includes('network') || err.message.includes('fetch'));
    console.log('✓ Simulated error successfully caught:', err.message);
  }

  // Disable simulated error & retry
  setSimulateError(false);
  const recoveredProducts = await marketplaceService.getProducts();
  assert.ok(recoveredProducts.length > 0);
  console.log('✓ Service successfully recovered after retry');

  console.log('\n=========================================');
  console.log('ALL 1FI MARKETPLACE TESTS PASSED (9/9)!');
  console.log('=========================================\n');
}

runServiceTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
