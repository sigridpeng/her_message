
import React from 'react';
import { EndingType } from '../types';

interface ChoiceOverlayProps {
  hasTestReport: boolean;
  onChoice: (ending: EndingType) => void;
}

const ChoiceOverlay: React.FC<ChoiceOverlayProps> = ({ hasTestReport, onChoice }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-white/60 backdrop-blur-xl">
      <div className="max-w-md w-full bg-white/90 p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_40px_80px_rgba(0,0,0,0.15)] text-center">
        <h2 className="text-2xl font-black text-slate-800 mb-3 italic tracking-widest">要出門嗎？</h2>
        <p className="text-slate-400 text-xs mb-10 italic uppercase tracking-[0.2em]">一旦離開，回憶將不再延續</p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => onChoice(EndingType.Normal)}
            className="group flex items-center p-5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-orange-300 rounded-2xl transition-all shadow-sm hover:shadow-md"
          >
            <span className="text-xl mr-6 group-hover:scale-125 transition-transform">🏙️</span>
            <span className="text-slate-700 font-black tracking-widest text-xs uppercase">去她工作地點找她</span>
          </button>

          <button
            onClick={() => onChoice(EndingType.Bad1)}
            className="group flex items-center p-5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-orange-300 rounded-2xl transition-all shadow-sm hover:shadow-md"
          >
            <span className="text-xl mr-6 group-hover:scale-125 transition-transform">🏠</span>
            <span className="text-slate-700 font-black tracking-widest text-xs uppercase">去她異性朋友家找她</span>
          </button>

          {hasTestReport && (
            <button
              onClick={() => onChoice(EndingType.Happy)}
              className="group flex items-center p-5 bg-rose-50 hover:bg-white border-2 border-rose-100 hover:border-rose-400 rounded-2xl transition-all shadow-md animate-pulse"
            >
              <span className="text-xl mr-6 group-hover:scale-125 transition-transform">🏥</span>
              <span className="text-rose-600 font-black tracking-widest text-xs uppercase">去醫院找她</span>
            </button>
          )}

          <button
            onClick={() => onChoice(EndingType.Bad2)}
            className="group flex items-center p-5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-orange-300 rounded-2xl transition-all shadow-sm hover:shadow-md"
          >
            <span className="text-xl mr-6 group-hover:scale-125 transition-transform">✉️</span>
            <span className="text-slate-700 font-black tracking-widest text-xs uppercase">留下分手信離開這裡</span>
          </button>

          <button
            onClick={() => onChoice(EndingType.None)}
            className="mt-6 p-4 text-slate-400 hover:text-slate-900 transition-colors text-[10px] font-black tracking-[0.5em] uppercase"
          >
            ← 繼續探索
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoiceOverlay;
