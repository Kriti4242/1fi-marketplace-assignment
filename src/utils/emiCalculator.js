/**
 * Financial Calculation Engine for 1Fi No-Cost & Standard EMIs
 * Backed by Mutual Funds (0% interest, no credit pull)
 */

/**
 * Calculates monthly EMI, total interest, and total payable for a given principal, tenure, and annual interest rate.
 * @param {number} principal - Total loan / product price in INR
 * @param {number} tenureMonths - Number of months (e.g., 3, 6, 9, 12, 18, 24)
 * @param {number} annualInterestRate - Annual interest rate (0 for No-Cost EMI)
 * @param {number} processingFee - Optional processing fee (usually 0 for 1Fi)
 * @returns {object} Calculated EMI plan object
 */
export function calculateEmi({
  principal,
  tenureMonths,
  annualInterestRate = 0,
  processingFee = 0,
  isNoCost = true,
}) {
  const safePrincipal = Math.max(0, Number(principal) || 0);
  const tenure = Math.max(1, Number(tenureMonths) || 1);

  if (safePrincipal === 0) {
    return {
      tenureMonths: tenure,
      monthlyAmount: 0,
      annualInterestRate: 0,
      totalInterest: 0,
      processingFee: 0,
      totalPayable: 0,
      isNoCost: true,
    };
  }

  // 1Fi 0% No-Cost EMI Calculation
  if (isNoCost || annualInterestRate === 0) {
    const monthlyAmount = Math.ceil(safePrincipal / tenure);
    const totalPayable = monthlyAmount * tenure + processingFee;
    const totalInterest = 0;

    return {
      tenureMonths: tenure,
      monthlyAmount,
      annualInterestRate: 0,
      totalInterest,
      processingFee,
      totalPayable,
      isNoCost: true,
      interestDiscount: Math.round((safePrincipal * 0.14 * (tenure / 12))), // savings compared to typical 14% credit card EMI
    };
  }

  // Standard Reducing Balance EMI formula: E = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
  const monthlyRate = annualInterestRate / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenure);
  const monthlyAmount = Math.ceil((safePrincipal * monthlyRate * factor) / (factor - 1));
  const totalAmount = monthlyAmount * tenure;
  const totalInterest = Math.max(0, totalAmount - safePrincipal);
  const totalPayable = totalAmount + processingFee;

  return {
    tenureMonths: tenure,
    monthlyAmount,
    annualInterestRate,
    totalInterest,
    processingFee,
    totalPayable,
    isNoCost: false,
    interestDiscount: 0,
  };
}

/**
 * Generate a complete set of EMI options for a given price and product settings
 * @param {number} price - Current product variant price
 * @param {number[]} supportedTenures - Array of supported tenures, e.g., [3, 6, 9, 12, 18, 24]
 * @param {number[]} noCostTenures - Array of tenures that qualify for 0% No-Cost EMI
 * @param {number} processingFee - Applicable processing fee
 * @returns {Array} Array of formatted EMI plans
 */
export function generateEmiPlans({
  price,
  supportedTenures = [3, 6, 9, 12, 18, 24],
  noCostTenures = [3, 6, 9, 12],
  processingFee = 0,
}) {
  return supportedTenures.map((tenure) => {
    const isNoCost = noCostTenures.includes(tenure);
    // Standard rate for tenures beyond no-cost promotional period is 12% p.a.
    const interestRate = isNoCost ? 0 : 12;

    const calculation = calculateEmi({
      principal: price,
      tenureMonths: tenure,
      annualInterestRate: interestRate,
      processingFee,
      isNoCost,
    });

    return {
      id: `emi-${tenure}m`,
      duration: tenure,
      title: `${tenure} Months`,
      monthlyAmount: calculation.monthlyAmount,
      interestRate,
      processingFee: calculation.processingFee,
      totalPayable: calculation.totalPayable,
      totalInterest: calculation.totalInterest,
      interestDiscount: calculation.interestDiscount,
      isNoCost: calculation.isNoCost,
      tag: isNoCost ? '0% Interest' : 'Special Rate',
      recommended: tenure === 6 || tenure === 12,
    };
  });
}

/**
 * Get the starting/minimum monthly EMI for a product
 */
export function getStartingEmi(price, supportedTenures = [3, 6, 9, 12], noCostTenures = [3, 6, 9, 12]) {
  const plans = generateEmiPlans({ price, supportedTenures, noCostTenures });
  if (!plans.length) return 0;
  // Return the plan with the lowest monthly amount (typically the longest tenure)
  return Math.min(...plans.map((p) => p.monthlyAmount));
}
