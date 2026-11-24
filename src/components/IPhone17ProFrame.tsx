import React from 'react';

interface IPhone17ProFrameProps {
  children: React.ReactNode;
  variant?: 'dark-screen' | 'light-screen';
}

export const IPhone17ProFrame: React.FC<IPhone17ProFrameProps> = ({ children }) => {
  return (
    <div className="relative flex items-center justify-center w-full sm:w-auto">
      {/* Side Hardware Buttons (Left: Action + Volume Up + Volume Down) */}
      <div
        aria-hidden="true"
        className="hidden sm:block absolute -left-[3px] top-[128px] w-[3px] h-[28px] rounded-l-sm bg-gradient-to-b from-[#52525B] via-[#71717A] to-[#3F3F46] shadow-sm"
      />
      <div
        aria-hidden="true"
        className="hidden sm:block absolute -left-[3px] top-[176px] w-[3px] h-[54px] rounded-l-sm bg-gradient-to-b from-[#52525B] via-[#71717A] to-[#3F3F46] shadow-sm"
      />
      <div
        aria-hidden="true"
        className="hidden sm:block absolute -left-[3px] top-[242px] w-[3px] h-[54px] rounded-l-sm bg-gradient-to-b from-[#52525B] via-[#71717A] to-[#3F3F46] shadow-sm"
      />

      {/* Side Hardware Button (Right: Power / Camera Control) */}
      <div
        aria-hidden="true"
        className="hidden sm:block absolute -right-[3px] top-[198px] w-[3px] h-[76px] rounded-r-sm bg-gradient-to-b from-[#52525B] via-[#71717A] to-[#3F3F46] shadow-sm"
      />
      <div
        aria-hidden="true"
        className="hidden sm:block absolute -right-[2.5px] top-[520px] w-[2.5px] h-[52px] rounded-r-sm bg-gradient-to-b from-[#3F3F46] via-[#71717A] to-[#3F3F46]"
      />

      {/* Outer Titanium Chassis (iPhone 17 Pro Desert/Black Titanium Finish) */}
      <div className="w-full sm:w-[462px] sm:p-[11px] sm:rounded-[56px] sm:bg-gradient-to-b sm:from-[#3A3B40] sm:via-[#232428] sm:to-[#2E2F34] sm:shadow-[0_32px_80px_rgba(15,23,42,0.28),0_0_0_1px_rgba(255,255,255,0.18)_inset]">
        {/* Inner Black Display Bezel + 440px Screen */}
        <div className="w-full sm:w-[440px] min-h-[100dvh] sm:min-h-[896px] sm:h-[906px] sm:rounded-[45px] sm:ring-[3px] sm:ring-[#09090B] relative flex flex-col overflow-hidden bg-[#F6F6F8]">
          {children}
        </div>
      </div>
    </div>
  );
};

interface IPhoneStatusBarProps {
  tone: 'light-text' | 'dark-text';
}

export const IPhoneStatusBar: React.FC<IPhoneStatusBarProps> = ({ tone }) => {
  const isLight = tone === 'light-text';
  const textColor = isLight ? 'text-white' : 'text-[#18181B]';
  const barBg = isLight ? 'bg-white' : 'bg-[#18181B]';
  const borderCol = isLight ? 'border-white/80' : 'border-[#18181B]/80';

  return (
    <div className={`px-6 pt-2.5 pb-1.5 flex items-center justify-between text-[12px] font-bold tracking-tight ${textColor}`}>
      <span className="w-[56px]">9:41</span>

      {/* Authentic Dynamic Island with subtle front camera lens */}
      <div
        aria-hidden="true"
        className="w-[108px] h-[27px] rounded-full bg-[#09090B] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] flex items-center justify-end px-2.5"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#161925] ring-1 ring-white/10 flex items-center justify-center">
          <span className="w-1 h-1 rounded-full bg-[#38BDF8]/40" />
        </span>
      </div>

      <div className="w-[56px] flex items-center justify-end gap-1.5" aria-hidden="true">
        <div className="flex items-end gap-[1.5px] h-2.5">
          <span className={`w-[2px] h-1 ${barBg} rounded-full`} />
          <span className={`w-[2px] h-1.5 ${barBg} rounded-full`} />
          <span className={`w-[2px] h-2 ${barBg} rounded-full`} />
          <span className={`w-[2px] h-2.5 ${barBg} rounded-full`} />
        </div>
        <span className="text-[10px] font-bold">5G</span>
        <div className={`w-[21px] h-[11px] rounded-[3.5px] border ${borderCol} p-[1.5px] flex items-center`}>
          <div className={`w-3.5 h-full ${barBg} rounded-[1.5px]`} />
        </div>
      </div>
    </div>
  );
};
