import React, { useState, useEffect, useMemo } from 'react';
import { ChinzoHomeOption1 } from './components/ChinzoHomeOption1';
import { ChinzoHomeOption2 } from './components/ChinzoHomeOption2';
import { ChinzoHomeOption3 } from './components/ChinzoHomeOption3';

export default function App() {
  const [designOption, setDesignOption] = useState<'all' | 'option1' | 'option2' | 'option3'>('all');
  const [selectedLocationId, setSelectedLocationId] = useState('manama');
  const [wishlistIds, setWishlistIds] = useState<string[]>(['lap-mac-neo-pink', 'brand-anker-25k']);
  const [cart, setCart] = useState<Record<string, number>>({ 'mega-xiaomi-17': 1 });

  // Live Mega Deals countdown matching Chinzo website (14 : 37 : 21)
  const [secondsLeft, setSecondsLeft] = useState(14 * 3600 + 37 * 60 + 21);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 14 * 3600 + 37 * 60 + 21));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const formattedCountdown = useMemo(() => {
    const hrs = Math.floor(secondsLeft / 3600);
    const mins = Math.floor((secondsLeft % 3600) / 60);
    const secs = secondsLeft % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(hrs)} : ${pad(mins)} : ${pad(secs)}`;
  }, [secondsLeft]);

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrementCart = (id: string) => {
    setCart((prev) => {
      const nextQty = (prev[id] || 0) - 1;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: nextQty };
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const sharedProps = {
    selectedLocationId,
    onSelectLocation: setSelectedLocationId,
    wishlistIds,
    onToggleWishlist: handleToggleWishlist,
    cart,
    onAddToCart: handleAddToCart,
    onDecrementCart: handleDecrementCart,
    onRemoveFromCart: handleRemoveFromCart,
    formattedCountdown,
  };

  return (
    <div className="min-h-screen w-full bg-[#E5E7EB] sm:py-6 sm:px-4 flex flex-col items-center justify-start gap-5">
      {/* Studio Switcher outside the iPhone 17 Pro frames */}
      <div className="hidden sm:flex flex-wrap items-center justify-center gap-1 p-1.5 rounded-full bg-white/95 shadow-sm border border-black/[0.06]">
        <button
          type="button"
          onClick={() => setDesignOption('all')}
          className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-colors whitespace-nowrap ${
            designOption === 'all'
              ? 'bg-[#E61114] text-white'
              : 'text-[#52525B] hover:text-[#18181B]'
          }`}
        >
          All 3 Options · iPhone 17 Pro
        </button>
        <button
          type="button"
          onClick={() => setDesignOption('option1')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-colors whitespace-nowrap ${
            designOption === 'option1'
              ? 'bg-[#18181B] text-white'
              : 'text-[#52525B] hover:text-[#18181B]'
          }`}
        >
          Option 1 · Crimson Header
        </button>
        <button
          type="button"
          onClick={() => setDesignOption('option2')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-colors whitespace-nowrap ${
            designOption === 'option2'
              ? 'bg-[#18181B] text-white'
              : 'text-[#52525B] hover:text-[#18181B]'
          }`}
        >
          Option 2 · Floating Dock
        </button>
        <button
          type="button"
          onClick={() => setDesignOption('option3')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-colors whitespace-nowrap ${
            designOption === 'option3'
              ? 'bg-[#18181B] text-white'
              : 'text-[#52525B] hover:text-[#18181B]'
          }`}
        >
          Option 3 · Hero Card &amp; Spotlight
        </button>
      </div>

      {/* iPhone 17 Pro Showcase Grid / Single View */}
      {designOption === 'all' ? (
        <div className="w-full max-w-[1520px] flex flex-wrap items-start justify-center gap-8 pb-6">
          <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
            <span className="hidden sm:inline-block text-[12px] font-bold text-[#52525B] tracking-tight">
              Option 1 · Crimson Header &amp; Dark Dock
            </span>
            <ChinzoHomeOption1 {...sharedProps} />
          </div>

          <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
            <span className="hidden sm:inline-block text-[12px] font-bold text-[#52525B] tracking-tight">
              Option 2 · Soft Minimal &amp; Floating Pill
            </span>
            <ChinzoHomeOption2 {...sharedProps} />
          </div>

          <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
            <span className="hidden sm:inline-block text-[12px] font-bold text-[#52525B] tracking-tight">
              Option 3 · Hero Card &amp; Spotlight
            </span>
            <ChinzoHomeOption3 {...sharedProps} />
          </div>
        </div>
      ) : designOption === 'option1' ? (
        <ChinzoHomeOption1 {...sharedProps} />
      ) : designOption === 'option2' ? (
        <ChinzoHomeOption2 {...sharedProps} />
      ) : (
        <ChinzoHomeOption3 {...sharedProps} />
      )}
    </div>
  );
}
