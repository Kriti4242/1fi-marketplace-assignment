import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  CheckCircle,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import Header from '../components/common/Header';
import ProductGallery from '../components/marketplace/ProductGallery';
import VariantSelector from '../components/marketplace/VariantSelector';
import EmiPlanSelector from '../components/marketplace/EmiPlanSelector';
import EmiBreakdownModal from '../components/marketplace/EmiBreakdownModal';
import { ProductDetailsSkeleton } from '../components/common/Skeleton';
import ErrorState from '../components/marketplace/ErrorState';
import { marketplaceService } from '../services/marketplaceService';
import { formatCurrency, formatDiscount } from '../utils/formatters';
import { useMarketplace } from '../context/MarketplaceContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCheckoutItem } = useMarketplace();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Variant selections
  const [selectedVariants, setSelectedVariants] = useState({});

  // Dynamic EMI plans for the active price
  const [emiPlans, setEmiPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loadingPlans, setLoadingPlans] = useState(false);

  // Modal for explaining no-cost EMI
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Fetch Product
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await marketplaceService.getProductById(id);
        setProduct(data);

        // Initialize default variants
        const initialVariants = {};
        if (data.variants?.storage?.length) {
          initialVariants.storage = data.variants.storage[0];
        }
        if (data.variants?.color?.length) {
          initialVariants.color = data.variants.color[0];
        }
        if (data.variants?.size?.length) {
          initialVariants.size = data.variants.size[0];
        }
        if (data.variants?.thickness?.length) {
          initialVariants.thickness = data.variants.thickness[0];
        }
        setSelectedVariants(initialVariants);
      } catch (err) {
        setError(err.message || 'Unable to load product details.');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  // 2. Compute dynamic price based on base price and variant modifiers
  const currentPrice = useMemo(() => {
    if (!product) return 0;
    let price = product.basePrice;
    if (selectedVariants.storage?.priceModifier) {
      price += selectedVariants.storage.priceModifier;
    }
    if (selectedVariants.color?.priceModifier) {
      price += selectedVariants.color.priceModifier;
    }
    if (selectedVariants.size?.priceModifier) {
      price += selectedVariants.size.priceModifier;
    }
    if (selectedVariants.thickness?.priceModifier) {
      price += selectedVariants.thickness.priceModifier;
    }
    return price;
  }, [product, selectedVariants]);

  // 3. Dynamically re-calculate EMI plans whenever currentPrice updates
  useEffect(() => {
    if (!product || currentPrice <= 0) return;

    let isMounted = true;
    async function updateEmiPlans() {
      setLoadingPlans(true);
      try {
        const plans = await marketplaceService.getEmiPlans(product.id, currentPrice);
        if (isMounted) {
          setEmiPlans(plans);
          // Preserve selected duration if already chosen, or default to 6M / 12M
          if (selectedPlan) {
            const matching = plans.find((p) => p.duration === selectedPlan.duration);
            setSelectedPlan(matching || plans[1] || plans[0]);
          } else {
            const defaultPlan = plans.find((p) => p.duration === 12) || plans[0];
            setSelectedPlan(defaultPlan);
          }
        }
      } catch (err) {
        console.error('Failed to compute dynamic EMI plans:', err);
      } finally {
        if (isMounted) setLoadingPlans(false);
      }
    }

    updateEmiPlans();
    return () => {
      isMounted = false;
    };
  }, [product, currentPrice]);

  const handleSelectVariant = (type, option) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [type]: option,
    }));
  };

  // Proceed with EMI CTA handler
  const handleProceedToCheckout = () => {
    if (!product || !selectedPlan) return;

    setCheckoutItem({
      product,
      selectedVariants,
      selectedPlan,
      finalPrice: currentPrice,
    });

    navigate('/shop/marketplace/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F5FA]">
        <Header title="Product Details" showBack />
        <main className="max-w-md mx-auto">
          <ProductDetailsSkeleton />
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F4F5FA]">
        <Header title="Product Details" showBack />
        <main className="max-w-md mx-auto pt-10">
          <ErrorState
            message={error || 'Product not found'}
            onRetry={() => window.location.reload()}
          />
        </main>
      </div>
    );
  }

  // Active color variant image (if available)
  const selectedColorImage = selectedVariants.color?.image;
  const isCtaDisabled = !selectedPlan || loadingPlans;

  return (
    <div className="min-h-screen bg-[#F4F5FA] flex flex-col pb-28">
      {/* App Header with Back Arrow */}
      <Header title={product.brand} showBack subtitle={product.name} />

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-3 space-y-4">
        {/* Product Images Gallery */}
        <ProductGallery
          images={product.images}
          selectedColorImage={selectedColorImage}
          discountPercentage={product.discountPercentage}
          productName={product.name}
        />

        {/* Product Basic Info Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black tracking-wider uppercase text-[#5034D8] bg-[#5034D8]/10 px-2.5 py-0.5 rounded-full">
              {product.brand}
            </span>
            <div className="flex items-center space-x-1 bg-amber-50 px-2 py-0.5 rounded-lg text-xs font-bold text-amber-800">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-snug">
            {product.name}
          </h1>

          <p className="text-xs text-gray-600 leading-relaxed">
            {product.tagline || product.description}
          </p>

          {/* Pricing Row */}
          <div className="pt-2 border-t border-gray-100 flex items-baseline space-x-3">
            <span className="text-2xl font-black text-gray-900">
              {formatCurrency(currentPrice)}
            </span>
            {product.originalPrice && product.originalPrice > currentPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(product.originalPrice + (currentPrice - product.basePrice))}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Save {formatDiscount(product.discountPercentage)}
              </span>
            )}
          </div>
        </div>

        {/* Variant Selection Section */}
        {product.variants && Object.keys(product.variants).length > 0 && (
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs">
            <VariantSelector
              variants={product.variants}
              selectedVariants={selectedVariants}
              onSelectVariant={handleSelectVariant}
            />
          </div>
        )}

        {/* 1Fi EMI Plan Selection Section */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs">
          <EmiPlanSelector
            emiPlans={emiPlans}
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
            onOpenBreakdownModal={() => setIsModalOpen(true)}
          />
        </div>

        {/* Key Features & Specifications */}
        {product.features && product.features.length > 0 && (
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Highlights & Specifications
            </h3>
            <ul className="space-y-2">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-gray-700">
                  <CheckCircle className="w-4 h-4 text-[#5034D8] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-white rounded-2xl p-3 border border-gray-100 flex items-center space-x-2 text-xs text-gray-700 shadow-xs">
            <Truck className="w-4 h-4 text-[#5034D8]" />
            <span className="font-semibold">Free Insured Delivery</span>
          </div>
          <div className="bg-white rounded-2xl p-3 border border-gray-100 flex items-center space-x-2 text-xs text-gray-700 shadow-xs">
            <RotateCcw className="w-4 h-4 text-[#5034D8]" />
            <span className="font-semibold">7 Days Easy Return</span>
          </div>
        </div>
      </main>

      {/* Floating Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl p-3 sm:p-4">
        <div className="max-w-md mx-auto flex items-center justify-between space-x-4">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
              {selectedPlan ? `${selectedPlan.duration}M No-Cost Plan` : 'Selected Price'}
            </span>
            <div className="text-base sm:text-lg font-black text-[#5034D8]">
              {selectedPlan
                ? `${formatCurrency(selectedPlan.monthlyAmount)}/mo`
                : formatCurrency(currentPrice)}
            </div>
            {selectedPlan && (
              <span className="text-[10px] text-emerald-600 font-bold block">
                0% Interest • ₹0 Extra
              </span>
            )}
          </div>

          <button
            onClick={handleProceedToCheckout}
            disabled={isCtaDisabled}
            className="flex-1 py-3.5 px-5 rounded-full bg-[#5034D8] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#4329C1] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#5034D8]"
          >
            <span>Proceed with EMI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* EMI Breakdown Modal */}
      <EmiBreakdownModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
