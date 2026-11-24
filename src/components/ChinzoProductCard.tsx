import React from 'react';
import { Heart, Plus, Minus, Star, Zap } from 'lucide-react';
import type { ChinzoProduct } from '../data/chinzoData';

interface ChinzoProductCardProps {
  product: ChinzoProduct;
  isWishlisted: boolean;
  cartQty: number;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (id: string) => void;
  onDecrementCart: (id: string) => void;
}

export const ChinzoProductCard: React.FC<ChinzoProductCardProps> = ({
  product,
  isWishlisted,
  cartQty,
  onToggleWishlist,
  onAddToCart,
  onDecrementCart,
}) => {
  const badgeText = product.kicker || product.tag;

  return (
    <article className="bg-white rounded-2xl border border-black/[0.05] shadow-[0_2px_10px_rgba(24,24,27,0.04)] overflow-hidden flex flex-col transition-transform duration-150 active:scale-[0.99]">
      {/* Product Visual Container */}
      <div className="relative aspect-[4/3.6] bg-[#F8F8FA] p-2.5 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain mix-blend-multiply"
        />

        {/* Subtle single label matching Chinzo website */}
        {badgeText && (
          <span
            className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-tight leading-tight ${
              product.kicker
                ? 'bg-[#E61114] text-white'
                : badgeText === 'Best Seller'
                  ? 'bg-[#1F2430] text-white'
                  : 'bg-[#7A1B47] text-white'
            }`}
          >
            {badgeText}
          </span>
        )}

        {/* Wishlist Heart Button (44px accessible hitbox via padding/tap zone) */}
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
          className="absolute top-1 right-1 w-10 h-10 flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-[#E61114]"
        >
          <span className="w-7 h-7 rounded-full bg-white/95 shadow-sm border border-black/5 flex items-center justify-center transition-transform duration-150 active:scale-90">
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isWishlisted ? 'fill-[#E61114] text-[#E61114]' : 'text-[#52525B]'
              }`}
            />
          </span>
        </button>

        {/* Quick Add / Quantity Stepper */}
        <div className="absolute bottom-1.5 right-1.5">
          {cartQty === 0 ? (
            <button
              type="button"
              onClick={() => onAddToCart(product.id)}
              aria-label={`Add ${product.title} to cart`}
              className="w-9 h-9 rounded-xl bg-white text-[#18181B] shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-black/5 flex items-center justify-center hover:bg-[#E61114] hover:text-white transition-colors active:scale-90 focus-visible:outline-2 focus-visible:outline-[#E61114]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-[#18181B] text-white rounded-xl h-8 px-1.5 shadow-md">
              <button
                type="button"
                onClick={() => onDecrementCart(product.id)}
                aria-label="Decrease quantity"
                className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/15 active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-[11px] font-bold tabular-nums min-w-[14px] text-center">
                {cartQty}
              </span>
              <button
                type="button"
                onClick={() => onAddToCart(product.id)}
                aria-label="Increase quantity"
                className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/15 active:scale-90"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-2.5 pt-2 flex-1 flex flex-col justify-between gap-1.5">
        <div>
          <h3 className="text-[12px] font-semibold text-[#18181B] leading-[1.35] line-clamp-2 min-h-[32px]">
            {product.title}
          </h3>

          {/* Clean unboxed Rating & Rank Metadata */}
          <div className="mt-1 flex items-center gap-1 text-[11px] text-[#646773] tabular-nums">
            <Star className="w-3 h-3 fill-[#16A34A] text-[#16A34A] shrink-0" />
            <span className="font-semibold text-[#18181B]">{product.rating}</span>
            <span>({product.reviews})</span>
            {product.rankNote && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate text-[10.5px]">{product.rankNote}</span>
              </>
            )}
          </div>
        </div>

        {/* Pricing + Delivery */}
        <div className="pt-0.5">
          <div className="flex items-baseline flex-wrap gap-x-1.5 gap-y-0.5">
            <span className="text-[14px] font-extrabold text-[#18181B] tabular-nums tracking-tight">
              {product.priceBD}
            </span>
            {product.originalPrice && (
              <span className="text-[10.5px] text-[#8E929E] line-through tabular-nums">
                {product.originalPrice}
              </span>
            )}
            {product.discountPercent && (
              <span className="text-[10.5px] font-bold text-[#16A34A] tabular-nums">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="mt-1.5 flex items-center gap-1 text-[10.5px] leading-none">
            {product.deliveryType === 'instant' ? (
              <span className="inline-flex items-center gap-1 font-bold text-[#E61114]">
                <Zap className="w-3 h-3 fill-[#E61114]" />
                {product.deliveryLabel}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <span className="font-extrabold italic text-[#E61114] tracking-tight">express</span>
                <span className="font-semibold text-[#18181B]">Tomorrow</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
