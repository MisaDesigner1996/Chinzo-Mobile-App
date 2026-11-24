import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  Camera,
  SlidersHorizontal,
  MapPin,
  ChevronDown,
  Bell,
  ShoppingCart,
  Home,
  LayoutGrid,
  Heart,
  User,
  Plus,
  Minus,
  Star,
  Clock,
  Copy,
  Check,
  X,
  ChevronRight,
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

type FilterChip = 'FOR YOU' | 'MEGA DEALS' | 'EXPRESS' | 'TOP BRANDS' | 'OFFERS';

const FILTER_CHIPS: FilterChip[] = ['FOR YOU', 'MEGA DEALS', 'EXPRESS', 'TOP BRANDS', 'OFFERS'];

const OPTION2_QUICK_CATS = [
  { id: 'grocery', label: 'Grocery', group: 'Grocery' as const, image: '/assets/chinzo/cat_groc_beverages.jpg' },
  { id: 'electronics', label: 'Tech', group: 'Featured' as const, image: '/assets/chinzo/laptop_mac_m5.jpg' },
  { id: 'wellness', label: 'Wellness', group: 'Wellness' as const, image: '/assets/chinzo/wellness_centrum.jpg' },
  { id: 'kids', label: "Kids'", group: "Kids' Fashion" as const, image: '/assets/chinzo/cat_kids_backpacks.jpg' },
];

interface ChinzoHomeOption2Props {
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

export const ChinzoHomeOption2: React.FC<ChinzoHomeOption2Props> = ({
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
  const [activeFilter, setActiveFilter] = useState<FilterChip>('FOR YOU');
  const [selectedQuickCat, setSelectedQuickCat] = useState<string | null>(null);
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

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = allProducts;

    if (q) {
      return list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    if (selectedQuickCat === 'grocery') {
      list = list.filter((p) => p.category.toLowerCase().includes('home care') || p.id.includes('nestle'));
    } else if (selectedQuickCat === 'electronics') {
      list = list.filter((p) => p.section === 'laptops' || p.category.toLowerCase().includes('mobile') || p.category === 'Electronics');
    } else if (selectedQuickCat === 'wellness') {
      list = list.filter((p) => p.category.toLowerCase().includes('massage'));
    }

    if (activeFilter === 'MEGA DEALS') return list.filter((p) => p.section === 'mega');
    if (activeFilter === 'EXPRESS') return list.filter((p) => p.deliveryType === 'instant');
    if (activeFilter === 'TOP BRANDS') return list.filter((p) => p.section === 'brands');
    if (activeFilter === 'OFFERS') return list.filter((p) => (p.discountPercent || 0) >= 20);
    return list;
  }, [allProducts, searchQuery, selectedQuickCat, activeFilter]);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCode(code);
    showToast(`Code ${code} copied`);
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

  const renderSoftProductCard = (product: ChinzoProduct) => {
    const qty = cart[product.id] || 0;
    const isWishlisted = wishlistIds.includes(product.id);

    return (
      <article
        key={product.id}
        className="bg-white rounded-[22px] p-3 shadow-[0_6px_20px_rgba(24,24,27,0.05)] border border-black/[0.03] flex flex-col justify-between transition-transform duration-150 active:scale-[0.99]"
      >
        {/* Top Clean Image Box */}
        <div className="relative aspect-[4/3.5] rounded-2xl bg-[#F8F8FA] p-2 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain mix-blend-multiply"
          />

          {/* Discount / Tag */}
          {product.discountPercent ? (
            <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-[#FFF1F2] text-[#E61114] text-[10px] font-extrabold tabular-nums">
              -{product.discountPercent}%
            </span>
          ) : product.tag ? (
            <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-[#1A1D24] text-white text-[9.5px] font-bold">
              {product.tag}
            </span>
          ) : null}

          {/* Wishlist Heart */}
          <button
            type="button"
            onClick={() => {
              onToggleWishlist(product.id);
              showToast(isWishlisted ? 'Removed from Wishlist' : 'Saved to Wishlist');
            }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            className="absolute top-1 right-1 w-9 h-9 flex items-center justify-center rounded-full"
          >
            <span className="w-7 h-7 rounded-full bg-white/95 shadow-sm flex items-center justify-center">
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  isWishlisted ? 'fill-[#E61114] text-[#E61114]' : 'text-[#71717A]'
                }`}
              />
            </span>
          </button>
        </div>

        {/* Clean Title & Subtitle matching reference ("By City Pharma" style) */}
        <div className="mt-2.5">
          <h3 className="text-[13px] font-bold text-[#1A1D24] leading-[1.3] line-clamp-2 min-h-[34px]">
            {product.title}
          </h3>
          <div className="mt-0.5 flex items-center gap-1 text-[11px] text-[#71717A]">
            <span className="truncate">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-0.5 font-semibold text-[#1A1D24] tabular-nums shrink-0">
              <Star className="w-2.5 h-2.5 fill-[#16A34A] text-[#16A34A]" />
              {product.rating}
            </span>
          </div>
        </div>

        {/* Bottom Price & Circular Action Button (signature element from reference) */}
        <div className="mt-2.5 flex items-end justify-between gap-1">
          <div className="min-w-0">
            <p className="text-[14.5px] font-extrabold text-[#E61114] tabular-nums leading-none">
              {product.priceBD}
            </p>
            {product.originalPrice ? (
              <p className="text-[10.5px] text-[#9CA3AF] line-through tabular-nums mt-0.5 leading-none">
                {product.originalPrice}
              </p>
            ) : (
              <p className="text-[10px] text-[#646773] mt-0.5 leading-none truncate">
                {product.deliveryType === 'instant' ? '1 hr delivery' : 'Express'}
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
              className="w-8 h-8 rounded-full bg-[#E61114] text-white shadow-[0_4px_12px_rgba(230,17,20,0.32)] flex items-center justify-center hover:bg-[#C40C0F] active:scale-90 transition-all shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-[#F3F4F6] rounded-full px-1.5 h-8 border border-black/5 shrink-0">
              <button
                type="button"
                onClick={() => onDecrementCart(product.id)}
                aria-label="Decrease quantity"
                className="w-5 h-5 rounded-full bg-white text-[#1A1D24] shadow-xs flex items-center justify-center"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-[11px] font-extrabold text-[#1A1D24] tabular-nums min-w-[12px] text-center">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => onAddToCart(product.id)}
                aria-label="Increase quantity"
                className="w-5 h-5 rounded-full bg-[#E61114] text-white shadow-xs flex items-center justify-center"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <IPhone17ProFrame>
      <div className="w-full flex-1 min-h-0 bg-[#F3F4F6] relative flex flex-col overflow-hidden">
      {/* Compact Light Sticky Top Bar */}
      <header className="sticky top-0 z-30 bg-[#F3F4F6]/92 backdrop-blur-md px-4 pt-0 pb-2 shrink-0">
        <div className="-mx-4">
          <IPhoneStatusBar tone="dark-text" />
        </div>

        {/* Chinzo Logo + Location + Notification + Cart */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => handleBottomNavClick('home')}
              className="px-2 py-1 rounded-xl bg-[#E61114] shadow-sm shrink-0 flex items-center"
              aria-label="Chinzo Home"
            >
              <img
                src="/assets/chinzo/logo.png"
                alt="Chinzo"
                referrerPolicy="no-referrer"
                className="h-6 w-auto object-contain"
              />
            </button>

            <button
              type="button"
              onClick={() => setActiveSheet('location')}
              className="min-w-0 flex items-center gap-1 text-left px-2 py-1 rounded-xl hover:bg-black/5 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E61114] shrink-0" />
              <div className="min-w-0 leading-tight">
                <span className="block text-[9.5px] font-medium text-[#71717A]">Manama Delivery</span>
                <span className="flex items-center gap-0.5 text-[12px] font-bold text-[#1A1D24] truncate max-w-[130px]">
                  <span className="truncate">{currentLocation.label}</span>
                  <ChevronDown className="w-3 h-3 shrink-0 text-[#71717A]" />
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveSheet('notifications')}
              aria-label="Notifications"
              className="relative w-10 h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(24,24,27,0.06)] flex items-center justify-center text-[#1A1D24] active:scale-95 transition-transform"
            >
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#E61114] ring-2 ring-white" />
            </button>

            <button
              type="button"
              onClick={() => setActiveSheet('cart')}
              aria-label="Cart"
              className="relative w-10 h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(24,24,27,0.06)] flex items-center justify-center text-[#1A1D24] active:scale-95 transition-transform"
            >
              <ShoppingCart className="w-[18px] h-[18px]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#E61114] text-white text-[10px] font-extrabold tabular-nums flex items-center justify-center ring-2 ring-[#F3F4F6]">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Content Feed */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar pb-28 space-y-4">
        {/* Search Input + Dark Circular Filter Button (Direct layout match to Reference 2) */}
        <section className="px-4 pt-1 flex items-center gap-2.5">
          <div className="flex-1 h-11 rounded-full bg-white shadow-[0_4px_14px_rgba(24,24,27,0.05)] px-3.5 flex items-center gap-2 border border-black/[0.03]">
            <Search className="w-4 h-4 text-[#71717A] shrink-0" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search for "iPhone 18 pro"'
              aria-label="Search Chinzo products"
              className="w-full bg-transparent text-[13px] text-[#1A1D24] placeholder:text-[#8E929E] focus:outline-none"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-[#52525B] shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveSheet('categories')}
                aria-label="Browse by department"
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#52525B] hover:bg-zinc-100 shrink-0"
              >
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setActiveSheet('categories')}
            aria-label="Open category filters"
            className="w-11 h-11 rounded-full bg-[#1F242D] text-white shadow-[0_6px_16px_rgba(31,36,45,0.25)] flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </section>

        {/* 4-Column White Rounded-Square Category Shortcuts (Direct layout match to Reference 2) */}
        <section className="px-4" aria-label="Shop by Categories">
          <div className="grid grid-cols-4 gap-2.5">
            {OPTION2_QUICK_CATS.map((cat) => {
              const isSelected = selectedQuickCat === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    const next = isSelected ? null : cat.id;
                    setSelectedQuickCat(next);
                    if (next) showToast(`Filtering ${cat.label}`);
                  }}
                  className="flex flex-col items-center group active:scale-95 transition-transform"
                >
                  <div
                    className={`w-full aspect-square rounded-[20px] bg-white p-2 flex items-center justify-center shadow-[0_6px_18px_rgba(24,24,27,0.05)] border transition-all ${
                      isSelected ? 'border-[#E61114] ring-2 ring-[#E61114]/15' : 'border-black/[0.03]'
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <span
                    className={`mt-1.5 text-[11.5px] font-semibold leading-tight ${
                      isSelected ? 'text-[#E61114] font-bold' : 'text-[#1A1D24]'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Segmented Pill Filter Strip ("FOR YOU" / "MEGA DEALS" / "EXPRESS" / "OFFERS" — exact reference rhythm) */}
        <section className="px-4 flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {FILTER_CHIPS.map((chip) => {
            const isActive = activeFilter === chip;
            return (
              <button
                key={chip}
                type="button"
                onClick={() => setActiveFilter(chip)}
                className={`px-4 py-2 rounded-full text-[11.5px] font-bold tracking-wide whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#1F242D] text-white shadow-[0_4px_12px_rgba(31,36,45,0.2)]'
                    : 'bg-white text-[#1A1D24] shadow-[0_3px_10px_rgba(24,24,27,0.04)] hover:bg-zinc-50'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </section>

        {/* Compact Chinzo Promotional Banner Card */}
        {!searchQuery.trim() && (
          <section className="px-4">
            <div className="rounded-[22px] bg-gradient-to-r from-[#45130C] via-[#9E1914] to-[#C8883C] p-3.5 shadow-[0_8px_22px_rgba(158,25,20,0.2)] flex items-center justify-between gap-2 overflow-hidden relative">
              <img
                src="/assets/chinzo/hero_panda.png"
                alt="Chinzo Panda Mascot"
                referrerPolicy="no-referrer"
                className="h-[104px] w-auto object-contain -ml-2 -my-3 shrink-0"
              />
              <div className="flex-1 min-w-0 text-white">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#FDE68A]">
                    Grand Opening Sale
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-white/90 tabular-nums">
                    <Clock className="w-2.5 h-2.5 text-[#FDE68A]" />
                    {formattedCountdown}
                  </span>
                </div>
                <h1 className="text-[15.5px] font-extrabold font-display leading-tight mt-0.5">
                  Up to <span className="text-[#FCD34D]">70% OFF</span> Groceries &amp; Tech
                </h1>
                <p className="text-[11px] text-white/85 mt-0.5">
                  Shop · Order · Fast Manama Delivery
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveFilter('MEGA DEALS')}
                aria-label="View Mega Deals"
                className="w-8 h-8 rounded-full bg-white text-[#E61114] flex items-center justify-center shrink-0 shadow-sm active:scale-95"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </section>
        )}

        {/* Featured 2-Column Product Grid (Soft Cards + Red Circular + Buttons) */}
        <section className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-extrabold text-[#1A1D24] font-display tracking-tight">
                {searchQuery.trim()
                  ? `Search results (${filteredProducts.length})`
                  : activeFilter === 'FOR YOU'
                    ? 'Featured for you'
                    : activeFilter === 'MEGA DEALS'
                      ? 'Mega deals'
                      : activeFilter === 'EXPRESS'
                        ? '1-Hour Express in Manama'
                        : activeFilter === 'TOP BRANDS'
                          ? 'Top brand deals'
                          : 'Best savings'}
              </h2>
              {activeFilter === 'EXPRESS' && <Zap className="w-4 h-4 text-[#E61114] fill-[#E61114]" />}
            </div>

            {(selectedQuickCat || activeFilter !== 'FOR YOU' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedQuickCat(null);
                  setActiveFilter('FOR YOU');
                  setSearchQuery('');
                }}
                className="text-[12px] font-bold text-[#E61114]"
              >
                Reset
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-[22px] p-6 text-center shadow-[0_6px_20px_rgba(24,24,27,0.04)]">
              <p className="text-[13.5px] font-bold text-[#1A1D24]">No matching products</p>
              <p className="text-[12px] text-[#71717A] mt-1">Try resetting filters or searching another Chinzo item.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.slice(0, 6).map(renderSoftProductCard)}
            </div>
          )}
        </section>

        {/* Chinzo Website Category Collections Strip (Kids' Fashion, Grocery, Books) */}
        <section className="space-y-2.5">
          <div className="px-4 flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold text-[#1A1D24] font-display tracking-tight">
              Explore Chinzo departments
            </h2>
            <button
              type="button"
              onClick={() => setActiveSheet('categories')}
              className="text-[12px] font-bold text-[#E61114]"
            >
              See all
            </button>
          </div>
          <div className="px-4 flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {CHINZO_CATEGORIES.slice(8, 22).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => showToast(`Opened ${cat.name}`)}
                className="w-[84px] shrink-0 flex flex-col items-center text-center"
              >
                <div className="w-[84px] h-[84px] rounded-[20px] bg-white p-1.5 shadow-[0_4px_14px_rgba(24,24,27,0.05)] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="mt-1.5 text-[11px] font-semibold text-[#1A1D24] line-clamp-1">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Promotional Coupons + More Top Brands */}
        <section className="px-4 space-y-3">
          <h2 className="text-[16px] font-extrabold text-[#1A1D24] font-display tracking-tight">
            Maximize your savings
          </h2>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {CHINZO_COUPONS.map((coupon) => {
              const isCopied = copiedCode === coupon.code;
              return (
                <button
                  key={coupon.id}
                  type="button"
                  onClick={() => handleCopyCoupon(coupon.code)}
                  className="w-[196px] shrink-0 bg-white rounded-[20px] p-2.5 shadow-[0_4px_14px_rgba(24,24,27,0.05)] text-left active:scale-[0.98] transition-transform"
                >
                  <img
                    src={coupon.image}
                    alt={coupon.headline}
                    referrerPolicy="no-referrer"
                    className="w-full h-[88px] object-cover rounded-xl"
                  />
                  <div className="mt-2 flex items-center justify-between gap-1.5">
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-extrabold text-[#1A1D24] leading-tight">
                        {coupon.headline}
                      </p>
                      <p className="text-[10.5px] text-[#71717A] truncate">{coupon.subline}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-[9.5px] font-extrabold shrink-0 inline-flex items-center gap-1 ${
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

        {/* Remaining Top Brand Picks */}
        {filteredProducts.length > 6 && (
          <section className="px-4 space-y-3">
            <h2 className="text-[16px] font-extrabold text-[#1A1D24] font-display tracking-tight">
              Lowest prices on top brands
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.slice(6).map(renderSoftProductCard)}
            </div>
          </section>
        )}
      </main>

      {/* Subtle Toast */}
      {toastMessage && (
        <div className="pointer-events-none absolute bottom-[88px] left-1/2 -translate-x-1/2 z-40 px-3.5 py-2 rounded-full bg-[#1F242D] text-white text-[12px] font-semibold shadow-lg whitespace-nowrap">
          {toastMessage}
        </div>
      )}

      {/* Floating Frosted Pill Bottom Navigation Dock + Home Indicator */}
      <div className="absolute bottom-5 left-4 right-4 z-30 pointer-events-none">
        <nav
          aria-label="Primary Bottom Navigation"
          className="pointer-events-auto rounded-full bg-[#D8DCE3]/92 backdrop-blur-md p-1.5 shadow-[0_12px_32px_rgba(24,24,27,0.16)] border border-white/70 grid grid-cols-5 items-center gap-1"
        >
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
                aria-label={item.label}
                className={`relative h-11 rounded-full flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#E61114] text-white shadow-[0_4px_14px_rgba(230,17,20,0.36)]'
                    : 'text-[#52525B] hover:text-[#1A1D24]'
                }`}
              >
                <div className="relative">
                  <IconComponent className="w-[17px] h-[17px]" />
                  {'badge' in item && item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`absolute -top-1.5 -right-2 min-w-[14px] h-[14px] px-0.5 rounded-full text-[8.5px] font-extrabold tabular-nums flex items-center justify-center ${
                        isActive
                          ? 'bg-white text-[#E61114]'
                          : 'bg-[#E61114] text-white ring-2 ring-[#D8DCE3]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[9.5px] font-bold leading-none tracking-tight whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="pointer-events-none absolute bottom-1.5 left-0 right-0 z-30 flex justify-center" aria-hidden="true">
        <div className="w-[134px] h-[4px] rounded-full bg-[#18181B]/25" />
      </div>

      {/* Interactive Bottom Sheets */}
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
          if (dept.includes('Electronics')) setSelectedQuickCat('electronics');
          else if (dept.includes('Grocery')) setSelectedQuickCat('grocery');
          else if (dept.includes('Health')) setSelectedQuickCat('wellness');
          else setSelectedQuickCat(null);
          showToast(`Showing ${dept}`);
        }}
      />
      </div>
    </IPhone17ProFrame>
  );
};
