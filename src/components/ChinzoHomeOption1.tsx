import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  MapPin,
  ChevronDown,
  Bell,
  ShoppingCart,
  Home,
  LayoutGrid,
  Heart,
  User,
  Clock,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Copy,
} from 'lucide-react';
import {
  CHINZO_LOCATIONS,
  QUICK_REASONS,
  CHINZO_CATEGORIES,
  MEGA_DEALS,
  LAPTOP_DEALS,
  TOP_BRAND_DEALS,
  CHINZO_COUPONS,
  type ChinzoCategory,
} from '../data/chinzoData';
import { ChinzoProductCard } from './ChinzoProductCard';
import { ChinzoSheets, type ActiveSheetType } from './ChinzoSheets';
import { IPhone17ProFrame, IPhoneStatusBar } from './IPhone17ProFrame';

type CategoryTab = ChinzoCategory['group'];
const CATEGORY_TABS: CategoryTab[] = ['Featured', "Kids' Fashion", 'Grocery', 'Books & Media', 'Wellness'];

interface ChinzoHomeOption1Props {
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

export const ChinzoHomeOption1: React.FC<ChinzoHomeOption1Props> = ({
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
  const [activeCategoryTab, setActiveCategoryTab] = useState<CategoryTab>('Featured');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeNav, setActiveNav] = useState<'home' | 'categories' | 'wishlist' | 'cart' | 'account'>('home');
  const [activeSheet, setActiveSheet] = useState<ActiveSheetType>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 3);
    }, 5500);
    return () => window.clearInterval(slideTimer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2200);
  };

  const allProducts = useMemo(() => [...MEGA_DEALS, ...LAPTOP_DEALS, ...TOP_BRAND_DEALS], []);

  const currentLocation = useMemo(
    () => CHINZO_LOCATIONS.find((l) => l.id === selectedLocationId) || CHINZO_LOCATIONS[0],
    [selectedLocationId]
  );

  const totalCartCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  const visibleCategories = useMemo(
    () => CHINZO_CATEGORIES.filter((c) => c.group === activeCategoryTab),
    [activeCategoryTab]
  );

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!normalizedSearch) return [];
    return allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(normalizedSearch) ||
        p.category.toLowerCase().includes(normalizedSearch)
    );
  }, [allProducts, normalizedSearch]);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCode(code);
    showToast(`Promo code ${code} copied`);
    window.setTimeout(() => {
      setCopiedCode((curr) => (curr === code ? null : curr));
    }, 2000);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBottomNavClick = (tab: 'home' | 'categories' | 'wishlist' | 'cart' | 'account') => {
    setActiveNav(tab);
    if (tab === 'home') {
      setActiveSheet(null);
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <IPhone17ProFrame>
      <div className="w-full flex-1 min-h-0 bg-[#F6F6F8] relative flex flex-col overflow-hidden">
      {/* Compact Sticky Chinzo Header */}
      <header className="sticky top-0 z-30 bg-[#E61114] text-white shrink-0">
        <IPhoneStatusBar tone="light-text" />

        <div className="px-4 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => handleBottomNavClick('home')}
              aria-label="Chinzo Home"
              className="shrink-0 focus-visible:outline-2 focus-visible:outline-white rounded-lg"
            >
              <img
                src="/assets/chinzo/logo.png"
                alt="Chinzo Logo"
                referrerPolicy="no-referrer"
                className="h-8 w-auto object-contain"
              />
            </button>

            <button
              type="button"
              onClick={() => setActiveSheet('location')}
              className="min-w-0 flex items-center gap-1 px-2 py-1.5 rounded-xl bg-black/15 hover:bg-black/25 transition-colors text-left"
            >
              <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
              <div className="min-w-0 leading-tight">
                <span className="block text-[9.5px] text-white/80 font-medium">Deliver to</span>
                <span className="flex items-center gap-0.5 text-[11.5px] font-bold text-white truncate max-w-[125px]">
                  <span className="truncate">{currentLocation.label}</span>
                  <ChevronDown className="w-3 h-3 shrink-0 opacity-90" />
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveSheet('notifications')}
              aria-label="Notifications"
              className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/15 active:scale-95 transition-all"
            >
              <Bell className="w-[19px] h-[19px] text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FACC15] ring-2 ring-[#E61114]" />
            </button>

            <button
              type="button"
              onClick={() => setActiveSheet('cart')}
              aria-label="Shopping cart"
              className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/15 active:scale-95 transition-all"
            >
              <ShoppingCart className="w-[19px] h-[19px] text-white" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-white text-[#E61114] text-[10px] font-extrabold tabular-nums flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Home Feed */}
      <main ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <div className="bg-gradient-to-b from-[#E61114] via-[#E61114]/15 to-transparent px-4 pt-1 pb-3">
          <div className="relative flex items-center bg-white rounded-2xl shadow-[0_6px_20px_rgba(24,24,27,0.08)] border border-black/[0.04] h-11 px-3.5">
            <Search className="w-4 h-4 text-[#646773] shrink-0 mr-2.5" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search for "iPhone 18 pro"'
              aria-label="Search Chinzo products"
              className="w-full bg-transparent text-[13.5px] text-[#18181B] placeholder:text-[#8E929E] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-[#52525B] shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {normalizedSearch ? (
          <section className="px-4 pt-1 pb-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-[#18181B]">
                Results for &ldquo;{searchQuery}&rdquo; ({searchResults.length})
              </h2>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[12px] font-bold text-[#E61114]"
              >
                Reset
              </button>
            </div>
            {searchResults.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center border border-black/[0.05]">
                <p className="text-[13.5px] font-bold text-[#18181B]">No matching items found</p>
                <p className="text-[12px] text-[#646773] mt-1">
                  Try searching &ldquo;MacBook&rdquo;, &ldquo;Anker&rdquo;, &ldquo;Xiaomi&rdquo;, or &ldquo;Water&rdquo;.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {searchResults.map((product) => (
                  <ChinzoProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    cartQty={cart[product.id] || 0}
                    onToggleWishlist={(id) => {
                      const exists = wishlistIds.includes(id);
                      onToggleWishlist(id);
                      showToast(exists ? 'Removed from Wishlist' : 'Saved to Wishlist');
                    }}
                    onAddToCart={(id) => {
                      onAddToCart(id);
                      showToast('Added to Chinzo Cart');
                    }}
                    onDecrementCart={onDecrementCart}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          <div className="space-y-5">
            {/* Hero Banner */}
            <section className="px-4" aria-label="Promotional Offers">
              <div className="relative rounded-[22px] overflow-hidden shadow-[0_8px_24px_rgba(24,24,27,0.12)]">
                {heroIndex === 0 && (
                  <div className="relative h-[168px] bg-gradient-to-r from-[#45130C] via-[#981D14] to-[#C8883C] p-4 flex items-center justify-between overflow-hidden">
                    <img
                      src="/assets/chinzo/hero_panda.png"
                      alt="Chinzo Panda Mascot"
                      referrerPolicy="no-referrer"
                      className="h-[154px] w-auto object-contain -ml-3 self-end drop-shadow-md shrink-0"
                    />
                    <div className="flex-1 pl-1.5 flex flex-col justify-between h-full py-0.5 text-right items-end">
                      <div>
                        <p className="text-[10px] font-extrabold tracking-wider uppercase text-[#FDE68A]">
                          Grand Opening Sale
                        </p>
                        <h1 className="text-[17px] leading-[1.15] font-extrabold text-white font-display mt-0.5">
                          Up to <span className="text-[#FCD34D]">70% OFF</span>
                        </h1>
                        <p className="text-[11px] font-medium text-white/90 mt-0.5">
                          on Groceries &amp; Electronics
                        </p>
                      </div>
                      <img
                        src="/assets/chinzo/hero_thumbs.png"
                        alt="20% to 60% off featured deals"
                        referrerPolicy="no-referrer"
                        className="w-[185px] h-auto rounded-lg object-contain shadow-sm"
                      />
                    </div>
                  </div>
                )}

                {heroIndex === 1 && (
                  <div className="relative h-[168px] bg-[#FF5254] p-4 flex items-center justify-between overflow-hidden">
                    <div className="max-w-[54%] text-white z-10">
                      <p className="text-[10.5px] font-bold text-white/90 uppercase tracking-wide">
                        20–31 October
                      </p>
                      <h2 className="text-[19px] leading-[1.15] font-extrabold font-display mt-1">
                        Big Wellness Savings
                      </h2>
                      <p className="text-[12px] font-semibold text-[#FEF08A] mt-1">
                        Up to 50% off Sports Nutrition &amp; Vitamins
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCategoryTab('Wellness');
                          scrollToSection('categories-section');
                        }}
                        className="mt-2.5 px-3 py-1.5 rounded-xl bg-white text-[#E61114] text-[11px] font-extrabold shadow-sm"
                      >
                        Shop Wellness
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 z-10">
                      <img
                        src="/assets/chinzo/wellness_protein.jpg"
                        alt="Sports Nutrition"
                        referrerPolicy="no-referrer"
                        className="w-[74px] h-[96px] object-contain bg-white rounded-xl p-1 shadow"
                      />
                      <img
                        src="/assets/chinzo/wellness_centrum.jpg"
                        alt="Centrum Vitamins"
                        referrerPolicy="no-referrer"
                        className="w-[74px] h-[96px] object-contain bg-white rounded-xl p-1 shadow"
                      />
                    </div>
                  </div>
                )}

                {heroIndex === 2 && (
                  <div className="relative h-[168px] bg-[#FDF8E4] p-4 flex flex-col justify-between overflow-hidden">
                    <img
                      src="/assets/chinzo/banner_bestsellers.jpg"
                      alt="Chinzo Bestsellers — Shop our top picks"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-right"
                    />
                    <div className="relative z-10 max-w-[55%]">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#E61114] text-white text-[9.5px] font-extrabold uppercase">
                        Top Rated
                      </span>
                      <h2 className="text-[20px] font-extrabold text-[#18181B] font-display mt-1 leading-tight">
                        Bestsellers
                      </h2>
                      <p className="text-[11.5px] font-medium text-[#52525B]">
                        Shop our top picks across Bahrain
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollToSection('laptop-deals')}
                      className="relative z-10 self-start px-3.5 py-1.5 rounded-xl bg-[#18181B] text-white text-[11px] font-bold"
                    >
                      Explore Picks
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setHeroIndex((prev) => (prev + 2) % 3)}
                  aria-label="Previous banner"
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setHeroIndex((prev) => (prev + 1) % 3)}
                  aria-label="Next banner"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded-full">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setHeroIndex(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        heroIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/55'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Reasons 4-Column */}
            <section className="px-4" aria-label="More reasons to shop">
              <div className="grid grid-cols-4 gap-2.5">
                {QUICK_REASONS.map((tile) => (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => scrollToSection(tile.targetSection)}
                    className="flex flex-col items-center group active:scale-95 transition-transform"
                  >
                    <div className="w-full aspect-square rounded-2xl bg-white border border-black/[0.05] shadow-[0_2px_10px_rgba(24,24,27,0.04)] p-1.5 flex items-center justify-center overflow-hidden group-hover:border-[#E61114]/40 transition-colors">
                      <img
                        src={tile.image}
                        alt={tile.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <span className="mt-1.5 text-[11px] font-bold text-[#18181B] leading-tight text-center truncate w-full">
                      {tile.label}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Shop by Categories */}
            <section id="categories-section" className="space-y-3">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-[17px] font-extrabold text-[#18181B] font-display tracking-tight">
                  Shop by Categories
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveSheet('categories')}
                  className="text-[12.5px] font-bold text-[#E61114] hover:underline whitespace-nowrap shrink-0"
                >
                  See all
                </button>
              </div>

              <div className="px-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {CATEGORY_TABS.map((tab) => {
                  const isActive = activeCategoryTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        setActiveCategoryTab(tab);
                        setSelectedCategoryId(null);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[12px] font-bold whitespace-nowrap shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#18181B] text-white shadow-sm'
                          : 'bg-white text-[#52525B] border border-black/[0.06] hover:text-[#18181B]'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              <div className="px-4 flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                {visibleCategories.map((cat) => {
                  const isSelected = selectedCategoryId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategoryId(isSelected ? null : cat.id);
                        showToast(`Browsing ${cat.name}`);
                      }}
                      className="w-[88px] shrink-0 flex flex-col items-center text-center group"
                    >
                      <div
                        className={`w-[88px] h-[92px] rounded-2xl bg-white p-1.5 border transition-all overflow-hidden flex items-center justify-center shadow-[0_2px_8px_rgba(24,24,27,0.04)] ${
                          isSelected
                            ? 'border-[#E61114] ring-2 ring-[#E61114]/20'
                            : 'border-black/[0.05] group-hover:border-zinc-300'
                        }`}
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <span className="mt-1.5 text-[11px] font-semibold text-[#18181B] leading-[1.2] line-clamp-2">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Mega Deals */}
            <section id="mega-deals" className="px-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <h2 className="text-[17px] font-extrabold text-[#18181B] font-display tracking-tight whitespace-nowrap">
                    Mega deals
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#27272A] text-white text-[10.5px] font-bold tabular-nums shrink-0">
                    <Clock className="w-3 h-3 text-[#FACC15]" />
                    {formattedCountdown}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection('laptop-deals')}
                  className="text-[12.5px] font-bold text-[#E61114] whitespace-nowrap shrink-0"
                >
                  See all
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {MEGA_DEALS.map((product) => (
                  <ChinzoProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    cartQty={cart[product.id] || 0}
                    onToggleWishlist={(id) => {
                      const exists = wishlistIds.includes(id);
                      onToggleWishlist(id);
                      showToast(exists ? 'Removed from Wishlist' : 'Saved to Wishlist');
                    }}
                    onAddToCart={(id) => {
                      onAddToCart(id);
                      showToast('Added to Chinzo Cart');
                    }}
                    onDecrementCart={onDecrementCart}
                  />
                ))}
              </div>
            </section>

            {/* Top deals in laptops */}
            <section id="laptop-deals" className="px-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-[17px] font-extrabold text-[#18181B] font-display tracking-tight">
                  Top deals in laptops
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveSheet('categories')}
                  className="text-[12.5px] font-bold text-[#E61114] whitespace-nowrap shrink-0"
                >
                  See all
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {LAPTOP_DEALS.slice(0, 4).map((product) => (
                  <ChinzoProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    cartQty={cart[product.id] || 0}
                    onToggleWishlist={(id) => {
                      const exists = wishlistIds.includes(id);
                      onToggleWishlist(id);
                      showToast(exists ? 'Removed from Wishlist' : 'Saved to Wishlist');
                    }}
                    onAddToCart={(id) => {
                      onAddToCart(id);
                      showToast('Added to Chinzo Cart');
                    }}
                    onDecrementCart={onDecrementCart}
                  />
                ))}
              </div>
            </section>

            {/* Coupons */}
            <section className="space-y-3">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-[17px] font-extrabold text-[#18181B] font-display tracking-tight">
                  Maximize your savings
                </h2>
                <span className="text-[11.5px] font-semibold text-[#646773]">Tap to copy</span>
              </div>

              <div className="px-4 flex gap-3 overflow-x-auto no-scrollbar pb-1">
                {CHINZO_COUPONS.map((coupon) => {
                  const isCopied = copiedCode === coupon.code;
                  return (
                    <button
                      key={coupon.id}
                      type="button"
                      onClick={() => handleCopyCoupon(coupon.code)}
                      className="w-[215px] shrink-0 bg-white rounded-2xl border border-black/[0.05] shadow-[0_2px_10px_rgba(24,24,27,0.04)] overflow-hidden text-left active:scale-[0.98] transition-transform"
                    >
                      <div className="h-[116px] w-full bg-[#F4F4F6] overflow-hidden relative">
                        <img
                          src={coupon.image}
                          alt={`${coupon.headline} with code ${coupon.code}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2.5 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[13px] font-extrabold text-[#18181B] leading-tight">
                            {coupon.headline}
                          </p>
                          <p className="text-[11px] text-[#646773] truncate mt-0.5">
                            {coupon.subline}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-lg text-[10px] font-extrabold shrink-0 inline-flex items-center gap-1 ${
                            isCopied
                              ? 'bg-[#16A34A] text-white'
                              : 'bg-[#FFF5F5] text-[#E61114] border border-[#E61114]/20'
                          }`}
                        >
                          {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-2.5 h-2.5" />}
                          {isCopied ? 'Copied' : coupon.code}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Lowest prices on top brands */}
            <section id="top-brands" className="px-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-[17px] font-extrabold text-[#18181B] font-display tracking-tight">
                  Lowest prices on top brands
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveSheet('categories')}
                  className="text-[12.5px] font-bold text-[#E61114] whitespace-nowrap shrink-0"
                >
                  See all
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {TOP_BRAND_DEALS.map((product) => (
                  <ChinzoProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    cartQty={cart[product.id] || 0}
                    onToggleWishlist={(id) => {
                      const exists = wishlistIds.includes(id);
                      onToggleWishlist(id);
                      showToast(exists ? 'Removed from Wishlist' : 'Saved to Wishlist');
                    }}
                    onAddToCart={(id) => {
                      onAddToCart(id);
                      showToast('Added to Chinzo Cart');
                    }}
                    onDecrementCart={onDecrementCart}
                  />
                ))}
              </div>
            </section>

            {/* In Focus Market Banner */}
            <section className="px-4 pb-2 space-y-3">
              <div className="rounded-2xl bg-white border border-black/[0.05] shadow-[0_2px_10px_rgba(24,24,27,0.04)] overflow-hidden">
                <div className="relative h-[120px] overflow-hidden">
                  <img
                    src="/assets/chinzo/in_focus_food.jpg"
                    alt="CHINZO Market fresh groceries and essentials"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex flex-col justify-end p-3.5">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#FDE68A]">
                      In focus · Manama
                    </p>
                    <p className="text-[15px] font-extrabold text-white font-display">
                      CHINZO Market Essentials
                    </p>
                    <p className="text-[11px] text-white/85">
                      Authentic goods, pantry staples &amp; 1-hour Bahrain delivery
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {toastMessage && (
        <div className="pointer-events-none absolute bottom-[78px] left-1/2 -translate-x-1/2 z-40 px-3.5 py-2 rounded-xl bg-[#18181B] text-white text-[12px] font-semibold shadow-lg whitespace-nowrap">
          {toastMessage}
        </div>
      )}

      {/* Fixed Dark Bottom Navigation Dock */}
      <nav
        aria-label="Primary Bottom Navigation"
        className="absolute bottom-0 left-0 right-0 z-30 bg-[#16171B] text-white rounded-t-[24px] px-2 pt-2 pb-1.5 shadow-[0_-8px_28px_rgba(0,0,0,0.16)]"
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
                className="relative flex flex-col items-center justify-center min-h-[44px] gap-1 focus-visible:outline-2 focus-visible:outline-white rounded-xl transition-transform active:scale-95"
              >
                {isActive && (
                  <span className="absolute -top-2 w-7 h-[3px] rounded-full bg-[#E61114]" />
                )}

                <div className="relative">
                  <IconComponent
                    className={`w-[20px] h-[20px] transition-colors ${
                      isActive ? 'text-[#FF4245]' : 'text-zinc-400'
                    }`}
                  />
                  {'badge' in item && item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 rounded-full bg-[#E61114] text-white text-[9px] font-extrabold tabular-nums flex items-center justify-center ring-2 ring-[#16171B]">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[10.5px] leading-none tracking-tight whitespace-nowrap ${
                    isActive ? 'font-bold text-white' : 'font-medium text-zinc-400'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-2 flex justify-center" aria-hidden="true">
          <div className="w-[134px] h-[4px] rounded-full bg-white/30" />
        </div>
      </nav>

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
          if (dept.includes('Kids')) setActiveCategoryTab("Kids' Fashion");
          else if (dept.includes('Grocery')) setActiveCategoryTab('Grocery');
          else if (dept.includes('Books')) setActiveCategoryTab('Books & Media');
          else if (dept.includes('Health')) setActiveCategoryTab('Wellness');
          else setActiveCategoryTab('Featured');
          scrollToSection('categories-section');
          showToast(`Showing ${dept}`);
        }}
      />
      </div>
    </IPhone17ProFrame>
  );
};
