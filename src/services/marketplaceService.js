import { MOCK_PRODUCTS, CATEGORIES } from '../data/mockProducts.js';
import { generateEmiPlans } from '../utils/emiCalculator.js';

// Flag to simulate network failure for testing error handling & retry
let shouldSimulateError = false;

export function setSimulateError(val) {
  shouldSimulateError = Boolean(val);
}

export function getSimulateError() {
  return shouldSimulateError;
}

// Simulated delay helper
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const marketplaceService = {
  /**
   * Fetch categories list
   */
  async getCategories() {
    await delay(200);

    if (shouldSimulateError) {
      throw new Error('Simulated network error: Unable to connect to 1Fi servers');
    }

    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Graceful local fallback
    }

    return CATEGORIES;
  },

  /**
   * Fetch products with search, category filtering, and sorting
   */
  async getProducts({ query = '', category = 'all', sort = 'recommended' } = {}) {
    await delay(350);

    if (shouldSimulateError) {
      throw new Error('Failed to fetch marketplace products. Please check your network connection.');
    }

    try {
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (category && category !== 'all') params.append('category', category);
      if (sort) params.append('sort', sort);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback to local filtering
    }

    // Local in-memory filtering fallback
    let results = [...MOCK_PRODUCTS];

    if (category && category !== 'all') {
      results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (query && query.trim() !== '') {
      const q = query.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sort === 'price-low') {
      results.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sort === 'price-high') {
      results.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sort === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    }

    return results;
  },

  /**
   * Fetch single product details by ID
   */
  async getProductById(id) {
    await delay(300);

    if (shouldSimulateError) {
      throw new Error(`Failed to load product ${id}.`);
    }

    try {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }

    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  /**
   * Dynamically fetch/calculate EMI plans for a specific variant price
   */
  async getEmiPlans(productId, variantPrice) {
    await delay(200);

    try {
      const res = await fetch(`/api/emi-plans/${productId}?price=${variantPrice}`);
      if (res.ok) {
        const json = await res.json();
        return json.data.plans;
      }
    } catch {
      // Fallback to dynamic local calculation
    }

    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    const supportedTenures = product ? product.supportedEmiTenures : [3, 6, 9, 12, 18, 24];
    const noCostTenures = product ? product.noCostEmiTenures : [3, 6, 12];
    const processingFee = product ? product.processingFee : 0;

    return generateEmiPlans({
      price: variantPrice,
      supportedTenures,
      noCostTenures,
      processingFee,
    });
  },

  /**
   * Submit simulated EMI Checkout / Pledge Order
   */
  async submitOrder({ productId, variantDetails, emiPlan, userPhone }) {
    await delay(500);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, variantDetails, emiPlan, userPhone }),
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback simulated order creation
    }

    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    return {
      orderId: `1FI-${Date.now().toString().slice(-6)}`,
      loanId: `LOAN-MF-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'APPROVED',
      createdAt: new Date().toISOString(),
      product: {
        id: productId,
        name: product?.name || '1Fi Marketplace Item',
        brand: product?.brand || '1Fi',
        image: product?.images[0],
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
      userPhone: userPhone || '+91 1234567898',
    };
  },
};
