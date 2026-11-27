import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  ChevronDown,
  Bell,
  ShoppingCart,
  Home,
  LayoutGrid,
  Heart,
  User,
  Clock,
  Star,
  Plus,
  Minus,
  Tag,
  Copy,
  Check,
  X,
  ArrowRight,
  Zap,
} from 'lucide-react';
import {
  CHINZO_LOCATIONS,
  CHINZO_CATEGORIES,
  MEGA_DEALS,
  LAPTOP_DEALS,
  TOP_BRAND_DEALS,
  CHINZO_COUPONS,
  type ChinzoProduct,
} from '../data/chinzoData';
import { ChinzoSheets, type ActiveSheetType } from './ChinzoSheets';
import { IPhone17ProFrame, IPhoneStatusBar } from './IPhone17ProFrame';

const OPTION3_SPECIALTIES = [
  { id: 'electronics', label: 'Electronics', image: '/assets/chinzo/laptop_mac_m5.jpg', tint: 'bg-[#FFF2F2]' },
  { id: 'grocery', label: 'Grocery', image: '/assets/chinzo/cat_groc_beverages.jpg', tint: 'bg-[#F3F6FA]' },
  { id: 'kids', label: "Kids' Wear", image: '/assets/chinzo/cat_kids_sets.jpg', tint: 'bg-[#F4F6F9]' },
  { id: 'books', label: 'Books', image: '/assets/chinzo/cat_book_selfhelp.jpg', tint: 'bg-[#F4F6F9]' },
];

interface ChinzoHomeOption3Props {
  selectedLocationId: string;
  onSelectLocation: (id: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  cart: Record<string, number>;
  onAddToCart: (id: string) => void;
  onDecrementCart: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
  formattedCountdown: string;
}

export const ChinzoHomeOption3: React.FC<ChinzoHomeOption3Props> = ({
  selectedLocationId,
  onSelectLocation,
  wishlistIds,
  onToggleWishlist,
  cart,
  onAddToCart,
  onDecrementCart,
  onRemoveFromCart,
  formattedCountdown,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<'home' | 'categories' | 'wishlist' | 'cart' | 'account'>('home');
  const [activeSheet, setActiveSheet] = useState<ActiveSheetType>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const allProducts = useMemo(() => [...MEGA_DEALS, ...LAPTOP_DEALS, ...TOP_BRAND_DEALS], []);

  const currentLocation = useMemo(
    () => CHINZO_LOCATIONS.find((l) => l.id === selectedLocationId) || CHINZO_LOCATIONS[0],
    [selectedLocationId]
  );

  const totalCartCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2200);
  };

  const spotlightProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      return allProducts.filter(
        (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    if (selectedSpecialty === 'electronics') {
      return [...LAPTOP_DEALS.slice(0, 3), MEGA_DEALS[0], TOP_BRAND_DEALS[0]];
    }
    if (selectedSpecialty === 'grocery') {
      return [MEGA_DEALS[3], TOP_BRAND_DEALS[1], MEGA_DEALS[1]];
    }
    return [LAPTOP_DEALS[0], MEGA_DEALS[0], LAPTOP_DEALS[1], TOP_BRAND_DEALS[0]];
  }, [allProducts, searchQuery, selectedSpecialty]);

  const popularProducts = useMemo(() => {
    return [MEGA_DEALS[1], MEGA_DEALS[2], TOP_BRAND_DEALS[1], TOP_BRAND_DEALS[2], TOP_BRAND_DEALS[3], MEGA_DEALS[3]];
  }, []);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCode(code);
    showToast(`Copied promo code ${code}`);
    window.setTimeout(() => {
      setCopiedCode((curr) => (curr === code ? null : curr));
    }, 2000);
  };

  const handleBottomNavClick = (tab: 'home' | 'categories' | 'wishlist' | 'cart' | 'account') => {
    setActiveNav(tab);
    if (tab === 'home') {
      setActiveSheet(null);
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'categories') {
      setActiveSheet('categories');
    } else if (tab === 'wishlist') {
      setActiveSheet('wishlist');
    } else if (tab === 'cart') {
      setActiveSheet('cart');
    } else if (tab === 'account') {
      setActiveSheet('account');
    }
  };

  const renderHorizontalSpotlightCard = (product: ChinzoProduct) => {
    const qty = cart[product.id] || 0;
    const isWishlisted = wishlistIds.includes(product.id);

    return (
      <article
        key={product.id}
        className="w-[308px] shrink-0 bg-white rounded-2xl p-3 shadow-[0_4px_18px_rgba(15,23,42,0.06)] border border-black/[0.04] flex items-center gap-3"
      >
        {/* Left Square Thumbnail */}
        <div className="relative w-[100px] h-[112px] rounded-xl bg-[#F6F7F9] p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain mix-blend-multiply"
          />
          {product.discountPercent && (
            <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#E61114] text-white text-[9.5px] font-extrabold tabular-nums">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Right Info + Action Row (Book Now + Icon style from Reference 3) */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-[112px]">
          <div>
            <h3 className="text-[13.5px] font-extrabold text-[#18181B] leading-snug line-clamp-1">
              {product.title}
            </h3>
            <p className="text-[11px] font-medium text-[#64748B] truncate mt-0.5">
              {product.category} · {product.deliveryType === 'instant' ? '1-Hr Express' : 'Express Tomorrow'}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-[11.5px] tabular-nums">
              <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B] shrink-0" />
              <span className="font-bold text-[#18181B]">{product.rating}</span>
              <span className="text-[#94A3B8]">({product.reviews})</span>
              <span className="text-[#E61114] font-extrabold ml-auto">{product.priceBD}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            {qty === 0 ? (
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product.id);
                  showToast('Added to Chinzo Cart');
                }}
                className="flex-1 h-9 rounded-xl bg-[#FFF1F2] hover:bg-[#E61114] text-[#E61114] hover:text-white border border-[#E61114]/15 text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors active:scale-95"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </button>
            ) : (
              <div className="flex-1 h-9 rounded-xl bg-[#18181B] text-white px-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onDecrementCart(product.id)}
                  aria-label="Decrease quantity"
                  className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-[12px] font-bold tabular-nums">{qty} in cart</span>
                <button
                  type="button"
                  onClick={() => onAddToCart(product.id)}
                  aria-label="Increase quantity"
                  className="w-6 h-6 rounded-lg bg-[#E61114] flex items-center justify-center"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                onToggleWishlist(product.id);
                showToast(isWishlisted ? 'Removed from Wishlist' : 'Saved to Wishlist');
              }}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors shrink-0 ${
                isWishlisted
                  ? 'bg-[#FFF1F2] border-[#E61114]/25 text-[#E61114]'
                  : 'bg-[#F8FAFC] border-slate-200 text-[#64748B]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#E61114]' : ''}`} />
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <IPhone17ProFrame>
      <div className="w-full flex-1 min-h-0 bg-[#F7F8FA] relative flex flex-col overflow-hidden">
      {/* Compact Sticky Top Header with Dynamic Island Status Bar */}
      <header className="sticky top-0 z-30 bg-[#F7F8FA]/95 backdrop-blur-md px-4 pt-0 pb-2 shrink-0">
        <div className="-mx-4 pb-1">
          <IPhoneStatusBar tone="dark-text" />
        </div>

        {/* Left: Delivery Info | Right: Bell + Cart */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center min-w-0">
            <button
              type="button"
              onClick={() => setActiveSheet('location')}
              className="min-w-0 text-left px-1 py-0.5 rounded-xl hover:bg-black/5 transition-colors"
            >
              <span className="block text-[11px] font-medium text-[#64748B] leading-tight">
                Deliver to
              </span>
              <span className="flex items-center gap-1 text-[14.5px] font-extrabold text-[#18181B] font-display leading-tight mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#E61114] shrink-0" />
                <span className="truncate max-w-[210px]">{currentLocation.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveSheet('notifications')}
              aria-label="Notifications"
              className="relative w-10 h-10 rounded-xl bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)] border border-black/[0.03] flex items-center justify-center text-[#18181B] active:scale-95 transition-transform"
            >
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#E61114] ring-2 ring-white" />
            </button>

            <button
              type="button"
              onClick={() => setActiveSheet('cart')}
              aria-label="Shopping Cart"
              className="relative w-10 h-10 rounded-xl bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)] border border-black/[0.03] flex items-center justify-center text-[#18181B] active:scale-95 transition-transform"
            >
              <ShoppingCart className="w-[18px] h-[18px]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#E61114] text-white text-[10px] font-extrabold tabular-nums flex items-center justify-center ring-2 ring-[#F7F8FA]">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Content Feed */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar pb-24 space-y-4">
        {/* Search Input + Rounded-Square Filter Button (Exact match to Reference 3) */}
        <section className="px-4 pt-1 flex items-center gap-2.5">
          <div className="flex-1 h-11 rounded-xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] border border-black/[0.03] px-3.5 flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#64748B] shrink-0" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search for "iPhone 18 pro"'
              aria-label="Search Chinzo products"
              className="w-full bg-transparent text-[13.5px] text-[#18181B] placeholder:text-[#94A3B8] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[#475569]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setActiveSheet('categories')}
            aria-label="Filter categories"
            className="w-11 h-11 rounded-xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] border border-black/[0.03] flex items-center justify-center text-[#18181B] shrink-0 active:scale-95 transition-transform"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </section>

        {/* Signature Hero Gradient Card (Exact structural match to Reference 3's Hero Card) */}
        {!searchQuery.trim() && (
          <section className="px-4">
            <div className="rounded-[22px] bg-gradient-to-br from-[#B80B0E] via-[#E61114] to-[#FB5449] p-4 text-white shadow-[0_12px_28px_rgba(230,17,20,0.24)] space-y-3.5">
              {/* Top Hero Info Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-xl bg-white/95 p-1 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                    <img
                      src="/assets/chinzo/hero_panda.png"
                      alt="Chinzo Panda Mascot"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-[16px] font-extrabold font-display leading-tight">
                      Grand Opening Sale
                    </h1>
                    <p className="text-[12px] text-white/90 font-medium mt-0.5">
                      Up to 70% OFF Groceries &amp; Tech
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-[11.5px] font-bold">
                      <div className="flex items-center gap-0.5 text-[#FACC15]">
                        <Star className="w-3 h-3 fill-[#FACC15]" />
                        <Star className="w-3 h-3 fill-[#FACC15]" />
                        <Star className="w-3 h-3 fill-[#FACC15]" />
                        <Star className="w-3 h-3 fill-[#FACC15]" />
                        <Star className="w-3 h-3 fill-[#FACC15]" />
                      </div>
                      <span className="ml-0.5 tabular-nums">4.9</span>
                      <span className="text-white/80 font-medium">· CHINZO Market</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyCoupon('SAVE10')}
                  aria-label="Copy SAVE10 promo code"
                  className="w-9 h-9 rounded-xl bg-white text-[#E61114] flex items-center justify-center shadow-sm shrink-0 active:scale-95"
                >
                  <Tag className="w-4 h-4" />
                </button>
              </div>

              {/* Dual Action Pills inside Hero Card (exact layout match to 09:00-10:00 + Join the Call) */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="h-10 rounded-xl bg-white/18 border border-white/30 px-3 flex items-center justify-center gap-1.5 text-[12px] font-bold tabular-nums">
                  <Clock className="w-3.5 h-3.5 text-[#FEF08A] shrink-0" />
                  <span>{formattedCountdown}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedSpecialty('electronics');
                    showToast('Showing Grand Opening Electronics Deals');
                  }}
                  className="h-10 rounded-xl bg-white text-[#E61114] px-3 flex items-center justify-center gap-1.5 text-[12px] font-extrabold shadow-sm hover:bg-[#FFF5F5] active:scale-[0.98] transition-all"
                >
                  <span>Shop 70% OFF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Shop by Categories (4-Column Tinted Square Tiles matching "Doctor Specialty") */}
        <section className="px-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold text-[#18181B] font-display tracking-tight">
              Shop by Categories
            </h2>
            <button
              type="button"
              onClick={() => setActiveSheet('categories')}
              className="text-[12.5px] font-semibold text-[#64748B] hover:text-[#E61114]"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {OPTION3_SPECIALTIES.map((cat) => {
              const isSelected = selectedSpecialty === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    const next = isSelected ? null : cat.id;
                    setSelectedSpecialty(next);
                    if (next) showToast(`Filtering ${cat.label}`);
                  }}
                  className="flex flex-col items-center group active:scale-95 transition-transform"
                >
                  <div
                    className={`w-full aspect-square rounded-2xl p-2 flex items-center justify-center overflow-hidden border transition-all ${
                      isSelected
                        ? 'bg-[#FFF1F2] border-[#E61114] ring-2 ring-[#E61114]/15'
                        : `${cat.tint} border-black/[0.03]`
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain rounded-xl mix-blend-multiply"
                    />
                  </div>
                  <span
                    className={`mt-1.5 text-[11.5px] font-semibold leading-tight text-center ${
                      isSelected ? 'text-[#E61114] font-bold' : 'text-[#334155]'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Horizontal Spotlight Cards (Matching "Top Doctor Lists" horizontal card pattern!) */}
        <section className="space-y-2.5">
          <div className="px-4 flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold text-[#18181B] font-display tracking-tight">
              {searchQuery.trim()
                ? `Search results (${spotlightProducts.length})`
                : selectedSpecialty
                  ? 'Top Picks in Category'
                  : 'Top Deals & Laptops'}
            </h2>
            <button
              type="button"
              onClick={() => {
                setSelectedSpecialty(null);
                setSearchQuery('');
              }}
              className="text-[12.5px] font-semibold text-[#64748B] hover:text-[#E61114]"
            >
              {selectedSpecialty || searchQuery ? 'Reset' : 'View all'}
            </button>
          </div>

          {spotlightProducts.length === 0 ? (
            <div className="mx-4 bg-white rounded-2xl p-5 text-center border border-black/[0.04]">
              <p className="text-[13.5px] font-bold text-[#18181B]">No matching items found</p>
              <p className="text-[12px] text-[#64748B] mt-1">Try searching &ldquo;MacBook&rdquo;, &ldquo;Anker&rdquo;, or &ldquo;Xiaomi&rdquo;.</p>
            </div>
          ) : (
            <div className="px-4 flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {spotlightProducts.map(renderHorizontalSpotlightCard)}
            </div>
          )}
        </section>

        {/* Chinzo Coupons Strip */}
        <section className="space-y-2.5">
          <div className="px-4 flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold text-[#18181B] font-display tracking-tight">
              Maximize your savings
            </h2>
            <span className="text-[11.5px] font-semibold text-[#64748B]">Tap code to copy</span>
          </div>

          <div className="px-4 flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {CHINZO_COUPONS.map((coupon) => {
              const isCopied = copiedCode === coupon.code;
              return (
                <button
                  key={coupon.id}
                  type="button"
                  onClick={() => handleCopyCoupon(coupon.code)}
                  className="w-[210px] shrink-0 bg-white rounded-2xl p-2.5 shadow-[0_3px_12px_rgba(15,23,42,0.04)] border border-black/[0.04] flex items-center gap-2.5 text-left active:scale-[0.98]"
                >
                  <img
                    src={coupon.image}
                    alt={coupon.headline}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-extrabold text-[#18181B] leading-tight">
                      {coupon.headline}
                    </p>
                    <p className="text-[10.5px] text-[#64748B] truncate">{coupon.subline}</p>
                    <span
                      className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                        isCopied ? 'bg-[#16A34A] text-white' : 'bg-[#FFF1F2] text-[#E61114]'
                      }`}
                    >
                      {isCopied ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                      {isCopied ? 'Copied' : coupon.code}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Lowest Prices & Mega Deals Compact 2-Column List */}
        <section className="px-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold text-[#18181B] font-display tracking-tight">
              Best sellers &amp; top brands
            </h2>
            <button
              type="button"
              onClick={() => setActiveSheet('categories')}
              className="text-[12.5px] font-semibold text-[#64748B] hover:text-[#E61114]"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {popularProducts.map((product) => {
              const qty = cart[product.id] || 0;
              const isWishlisted = wishlistIds.includes(product.id);
              return (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl p-2.5 shadow-[0_3px_14px_rgba(15,23,42,0.04)] border border-black/[0.04] flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3.3] rounded-xl bg-[#F6F7F9] p-2 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onToggleWishlist(product.id);
                        showToast(isWishlisted ? 'Removed from Wishlist' : 'Saved to Wishlist');
                      }}
                      aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isWishlisted ? 'fill-[#E61114] text-[#E61114]' : 'text-[#64748B]'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-[12px] font-bold text-[#18181B] leading-snug line-clamp-2 min-h-[32px]">
                      {product.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 text-[10.5px] text-[#64748B] tabular-nums">
                      <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="font-bold text-[#18181B]">{product.rating}</span>
                      <span>({product.reviews})</span>
                      {product.deliveryType === 'instant' && (
                        <Zap className="w-3 h-3 text-[#E61114] fill-[#E61114] ml-auto" />
                      )}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-1">
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-extrabold text-[#18181B] tabular-nums leading-none">
                        {product.priceBD}
                      </p>
                      {product.discountPercent && (
                        <p className="text-[10px] font-bold text-[#16A34A] mt-0.5 leading-none tabular-nums">
                          {product.discountPercent}% OFF
                        </p>
                      )}
                    </div>

                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(product.id);
                          showToast('Added to Chinzo Cart');
                        }}
                        aria-label={`Add ${product.title} to cart`}
                        className="w-8 h-8 rounded-xl bg-[#FFF1F2] text-[#E61114] hover:bg-[#E61114] hover:text-white flex items-center justify-center transition-colors shrink-0"
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 bg-[#18181B] text-white rounded-xl px-1.5 h-7 shrink-0">
                        <button
                          type="button"
                          onClick={() => onDecrementCart(product.id)}
                          aria-label="Decrease quantity"
                          className="w-4 h-4 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[10.5px] font-bold tabular-nums">{qty}</span>
                        <button
                          type="button"
                          onClick={() => onAddToCart(product.id)}
                          aria-label="Increase quantity"
                          className="w-4 h-4 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Chinzo Grocery & Books Quick Strip */}
        <section className="px-4 pb-2 space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold text-[#18181B] font-display tracking-tight">
              Grocery &amp; Books
            </h2>
            <button
              type="button"
              onClick={() => setActiveSheet('categories')}
              className="text-[12.5px] font-semibold text-[#64748B] hover:text-[#E61114]"
            >
              View all
            </button>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
            {CHINZO_CATEGORIES.slice(15, 25).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => showToast(`Browsing ${cat.name}`)}
                className="w-[78px] shrink-0 flex flex-col items-center text-center"
              >
                <div className="w-[78px] h-[78px] rounded-2xl bg-white p-1.5 border border-black/[0.04] shadow-xs">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="mt-1 text-[10.5px] font-semibold text-[#334155] line-clamp-1">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {toastMessage && (
        <div className="pointer-events-none absolute bottom-[82px] left-1/2 -translate-x-1/2 z-40 px-3.5 py-2 rounded-xl bg-[#18181B] text-white text-[12px] font-semibold shadow-lg whitespace-nowrap">
          {toastMessage}
        </div>
      )}

      {/* Clean White Bottom Navigation Bar with Gradient Active Tile */}
      <nav
        aria-label="Primary Bottom Navigation"
        className="absolute bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-100 px-3 pt-2 pb-1.5 shadow-[0_-4px_20px_rgba(15,23,42,0.06)]"
      >
        <div className="grid grid-cols-5 items-center">
          {(
            [
              { id: 'home', label: 'Home', icon: Home },
              { id: 'categories', label: 'Categories', icon: LayoutGrid },
              { id: 'wishlist', label: 'Wishlist', icon: Heart, badge: wishlistIds.length },
              { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: totalCartCount },
              { id: 'account', label: 'Account', icon: User },
            ] as const
          ).map((item) => {
            const IconComponent = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleBottomNavClick(item.id)}
                className="flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-transform"
              >
                <div
                  className={`relative w-11 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-gradient-to-br from-[#C40C0F] to-[#F43F5E] text-white shadow-[0_4px_12px_rgba(230,17,20,0.3)]'
                      : 'text-[#64748B] hover:text-[#18181B]'
                  }`}
                >
                  <IconComponent className="w-[18px] h-[18px]" />
                  {'badge' in item && item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`absolute -top-1 -right-1 min-w-[15px] h-[15px] px-1 rounded-full text-[9px] font-extrabold tabular-nums flex items-center justify-center ${
                        isActive
                          ? 'bg-white text-[#E61114]'
                          : 'bg-[#E61114] text-white ring-2 ring-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] leading-none tracking-tight ${
                    isActive ? 'font-bold text-[#E61114]' : 'font-medium text-[#64748B]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-2 flex justify-center" aria-hidden="true">
          <div className="w-[134px] h-[4px] rounded-full bg-[#18181B]/25" />
        </div>
      </nav>

      {/* Interactive Sheets */}
      <ChinzoSheets
        activeSheet={activeSheet}
        onClose={() => {
          setActiveSheet(null);
          setActiveNav('home');
        }}
        selectedLocationId={selectedLocationId}
        onSelectLocation={(id) => {
          onSelectLocation(id);
          const loc = CHINZO_LOCATIONS.find((l) => l.id === id);
          if (loc) showToast(`Delivery set to ${loc.label}`);
        }}
        allProducts={allProducts}
        cart={cart}
        wishlistIds={wishlistIds}
        onAddToCart={onAddToCart}
        onDecrementCart={onDecrementCart}
        onRemoveFromCart={onRemoveFromCart}
        onToggleWishlist={onToggleWishlist}
        onSelectDepartment={(dept) => {
          if (dept.includes('Electronics')) setSelectedSpecialty('electronics');
          else if (dept.includes('Grocery')) setSelectedSpecialty('grocery');
          else setSelectedSpecialty(null);
          showToast(`Showing ${dept}`);
        }}
      />
      </div>
    </IPhone17ProFrame>
  );
};
