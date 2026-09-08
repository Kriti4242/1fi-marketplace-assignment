import express from 'express';
import cors from 'cors';
import { MOCK_PRODUCTS, CATEGORIES } from '../src/data/mockProducts.js';
import { generateEmiPlans } from '../src/utils/emiCalculator.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: '1Fi Marketplace API', timestamp: new Date() });
});

// Get Categories
app.get('/api/categories', (req, res) => {
  res.json({ success: true, data: CATEGORIES });
});

// Get Products with search, category and sorting
app.get('/api/products', (req, res) => {
  const { query = '', category = 'all', sort = 'recommended' } = req.query;

  let filtered = [...MOCK_PRODUCTS];

  // Filter by category
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  // Filter by search query
  if (query && query.trim() !== '') {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (sort === 'price-low') {
    filtered.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sort === 'price-high') {
    filtered.sort((a, b) => b.basePrice - a.basePrice);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  res.json({
    success: true,
    total: filtered.length,
    data: filtered,
  });
});

// Get Single Product by ID
app.get('/api/products/:id', (req, res) => {
  const product = MOCK_PRODUCTS.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// Get Dynamic EMI Plans for a product and optional custom variant price
app.get('/api/emi-plans/:productId', (req, res) => {
  const product = MOCK_PRODUCTS.find((p) => p.id === req.params.productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const price = req.query.price ? Number(req.query.price) : product.basePrice;
  const plans = generateEmiPlans({
    price,
    supportedTenures: product.supportedEmiTenures,
    noCostTenures: product.noCostEmiTenures,
    processingFee: product.processingFee,
  });

  res.json({
    success: true,
    data: {
      productId: product.id,
      productName: product.name,
      price,
      plans,
    },
  });
});

// Process Simulated Checkout / EMI Confirmation
app.post('/api/orders', (req, res) => {
  const { productId, variantDetails, emiPlan, userPhone = '+91 1234567898' } = req.body;

  if (!productId || !emiPlan) {
    return res.status(400).json({ success: false, message: 'Missing product or EMI plan' });
  }

  const product = MOCK_PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const orderId = `1FI-${Date.now().toString().slice(-6)}`;
  const loanId = `LOAN-MF-${Math.floor(100000 + Math.random() * 900000)}`;

  const order = {
    orderId,
    loanId,
    status: 'APPROVED',
    createdAt: new Date(),
    product: {
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.images[0],
      variantDetails: variantDetails || {},
    },
    emiPlan,
    pledgeSummary: {
      collateralType: 'Mutual Funds Portfolio',
      creditPullRequired: false,
      interestRatePercent: emiPlan.interestRate,
      tenureMonths: emiPlan.duration,
      monthlyAmount: emiPlan.monthlyAmount,
      totalPayable: emiPlan.totalPayable,
    },
    userPhone,
  };

  res.status(201).json({ success: true, data: order });
});

app.listen(PORT, () => {
  console.log(`1Fi Marketplace Server running on port ${PORT}`);
});
