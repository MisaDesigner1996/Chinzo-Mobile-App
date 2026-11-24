import React from 'react';
import { X, MapPin, Check, Bell, ShoppingBag, Heart, Plus, Minus, Trash2, User, ShieldCheck, Truck } from 'lucide-react';
import { CHINZO_LOCATIONS, CHINZO_NAV_DEPARTMENTS, type ChinzoProduct } from '../data/chinzoData';

export type ActiveSheetType = null | 'location' | 'notifications' | 'cart' | 'wishlist' | 'categories' | 'account';

interface ChinzoSheetsProps {
  activeSheet: ActiveSheetType;
  onClose: () => void;
  selectedLocationId: string;
  onSelectLocation: (id: string) => void;
  allProducts: ChinzoProduct[];
  cart: Record<string, number>;
  wishlistIds: string[];
  onAddToCart: (id: string) => void;
  onDecrementCart: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
  onToggleWishlist: (id: string) => void;
  onSelectDepartment: (dept: string) => void;
}

export const ChinzoSheets: React.FC<ChinzoSheetsProps> = ({
  activeSheet,
  onClose,
  selectedLocationId,
  onSelectLocation,
  allProducts,
  cart,
  wishlistIds,
  onAddToCart,
  onDecrementCart,
  onRemoveFromCart,
  onToggleWishlist,
  onSelectDepartment,
}) => {
  if (!activeSheet) return null;

  const cartEntries = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({
      product: allProducts.find((p) => p.id === id),
      qty,
    }))
    .filter((item): item is { product: ChinzoProduct; qty: number } => Boolean(item.product));

  const cartSubtotal = cartEntries.reduce((sum, item) => sum + item.product.priceNum * item.qty, 0);
  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/45 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-[440px] bg-white rounded-t-[28px] shadow-2xl max-h-[78vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div className="pt-3 pb-1 flex justify-center shrink-0">
          <div className="w-10 h-1 rounded-full bg-zinc-300" />
        </div>

        {/* Sheet Header */}
        <div className="px-5 py-3 border-b border-zinc-100 flex items-center justify-between shrink-0">
          <h2 className="text-[16px] font-bold text-[#18181B] font-display">
            {activeSheet === 'location' && 'Delivery Location'}
            {activeSheet === 'notifications' && 'Chinzo Alerts & Offers'}
            {activeSheet === 'cart' && `Your Cart (${cartEntries.reduce((a, b) => a + b.qty, 0)})`}
            {activeSheet === 'wishlist' && `Saved Wishlist (${wishlistProducts.length})`}
            {activeSheet === 'categories' && 'All Chinzo Categories'}
            {activeSheet === 'account' && 'Chinzo Account'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-[#18181B] hover:bg-zinc-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sheet Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {activeSheet === 'location' && (
            <div className="space-y-2.5">
              {CHINZO_LOCATIONS.map((loc) => {
                const isSelected = loc.id === selectedLocationId;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      onSelectLocation(loc.id);
                      onClose();
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'border-[#E61114] bg-[#FFF5F5]'
                        : 'border-zinc-200 bg-white hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#E61114]' : 'text-zinc-500'}`} />
                      <div>
                        <p className="text-[13.5px] font-bold text-[#18181B]">{loc.label}</p>
                        <p className="text-[12px] text-[#646773]">{loc.detail} · {loc.eta}</p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#E61114] shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {activeSheet === 'notifications' && (
            <div className="space-y-3">
              {[
                {
                  title: 'Grand Opening Sale: Up to 70% OFF',
                  body: 'Save across Groceries, Electronics & Home Care in Manama.',
                  time: 'Active now',
                },
                {
                  title: 'Mega Deals Timer Running',
                  body: 'Xiaomi REDMI Note 17 Pro Max at 10.200 BD & Acer Aspire Lite at 3.500 BD.',
                  time: '14h 37m left',
                },
                {
                  title: 'Extra Coupon Codes Unlocked',
                  body: 'Use APPLIANCE10, CAMERAS20, or SAVE10 at checkout.',
                  time: 'Today',
                },
              ].map((note) => (
                <div key={note.title} className="p-3.5 rounded-2xl bg-[#F8F8FA] border border-zinc-100 flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FEE2E2] text-[#E61114] flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-[#18181B]">{note.title}</p>
                    <p className="text-[12px] text-[#646773] mt-0.5 leading-snug">{note.body}</p>
                    <p className="text-[11px] font-semibold text-[#E61114] mt-1">{note.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSheet === 'cart' && (
            <>
              {cartEntries.length === 0 ? (
                <div className="py-10 text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF5F5] text-[#E61114] mx-auto flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <p className="text-[14px] font-bold text-[#18181B]">Your Chinzo cart is empty</p>
                  <p className="text-[12.5px] text-[#646773]">Tap + on any product card to add items to your Bahrain order.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartEntries.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#F8F8FA] border border-zinc-100">
                      <img
                        src={product.image}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-contain rounded-xl bg-white p-1 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold text-[#18181B] line-clamp-1">{product.title}</p>
                        <p className="text-[13px] font-extrabold text-[#E61114] tabular-nums mt-0.5">{product.priceBD}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onDecrementCart(product.id)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-[#18181B]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[12px] font-bold tabular-nums w-4 text-center">{qty}</span>
                        <button
                          type="button"
                          onClick={() => onAddToCart(product.id)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-[#18181B]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveFromCart(product.id)}
                          aria-label="Remove item"
                          className="w-7 h-7 rounded-lg text-zinc-400 hover:text-[#E61114] flex items-center justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                    <div>
                      <p className="text-[11.5px] text-[#646773]">Subtotal (Free delivery over 10 BD)</p>
                      <p className="text-[17px] font-extrabold text-[#18181B] tabular-nums">
                        {cartSubtotal.toFixed(3)} BD
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-[#E61114] text-white text-[13px] font-bold hover:bg-[#C40C0F] transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {activeSheet === 'wishlist' && (
            <>
              {wishlistProducts.length === 0 ? (
                <div className="py-10 text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF5F5] text-[#E61114] mx-auto flex items-center justify-center">
                    <Heart className="w-6 h-6" />
                  </div>
                  <p className="text-[14px] font-bold text-[#18181B]">No saved favorites yet</p>
                  <p className="text-[12.5px] text-[#646773]">Tap the heart icon on any deal to save it here.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {wishlistProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#F8F8FA] border border-zinc-100">
                      <img
                        src={product.image}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-contain rounded-xl bg-white p-1 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold text-[#18181B] line-clamp-1">{product.title}</p>
                        <p className="text-[13px] font-extrabold text-[#18181B] tabular-nums mt-0.5">{product.priceBD}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onAddToCart(product.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#E61114] text-white text-[11.5px] font-bold shrink-0"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleWishlist(product.id)}
                        aria-label="Remove from wishlist"
                        className="w-8 h-8 flex items-center justify-center text-[#E61114]"
                      >
                        <Heart className="w-4 h-4 fill-[#E61114]" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeSheet === 'categories' && (
            <div className="grid grid-cols-2 gap-2.5">
              {CHINZO_NAV_DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => {
                    onSelectDepartment(dept);
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-[#F8F8FA] hover:bg-[#FFF5F5] border border-zinc-100 hover:border-[#E61114]/30 text-left text-[12.5px] font-semibold text-[#18181B] transition-colors"
                >
                  {dept}
                </button>
              ))}
            </div>
          )}

          {activeSheet === 'account' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#FFF5F5] border border-[#E61114]/15 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#E61114] text-white flex items-center justify-center shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#18181B]">Chinzo Shopper · Manama</p>
                  <p className="text-[12px] text-[#646773]">Free delivery unlocked with Chinzo Bahrain</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-[#F8F8FA] border border-zinc-100">
                  <Truck className="w-4 h-4 text-[#E61114] mb-1.5" />
                  <p className="text-[12.5px] font-bold text-[#18181B]">1-Hour Express</p>
                  <p className="text-[11px] text-[#646773]">Active in Manama</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#F8F8FA] border border-zinc-100">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A] mb-1.5" />
                  <p className="text-[12.5px] font-bold text-[#18181B]">Tabby & Tamara</p>
                  <p className="text-[11px] text-[#646773]">Split in 4 payments</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
