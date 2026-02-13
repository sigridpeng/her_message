
import React from 'react';
import { EndingType } from '../types';

interface ChoiceOverlayProps {
  hasTestReport: boolean;
  onChoice: (ending: EndingType) => void;
}

const ChoiceOverlay: React.FC<ChoiceOverlayProps> = ({ hasTestReport, onChoice }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border-2 border-rose-500/20">
        <h2 className="text-2xl font-black text-rose-300 mb-2 italic tracking-widest text-center">要出門嗎？</h2>
        <p className="text-slate-400 text-sm text-center mb-8 italic">一旦離開，回憶將不再延續。</p>
        
        <div className="flex flex-col space-y-3">
          <button 
            onClick={() => onChoice(EndingType.Normal)}
            className="group flex items-center p-4 bg-slate-900/50 hover:bg-rose-500/20 border border-slate-800 hover:border-rose-400 rounded-xl transition-all"
          >
            <span className="text-rose-400 font-bold mr-4 group-hover:scale-125 transition-transform">🏙️</span>
            <span className="text-white font-bold tracking-widest text-sm">去她工作地點找她</span>
          </button>

          <button 
            onClick={() => onChoice(EndingType.Bad1)}
            className="group flex items-center p-4 bg-slate-900/50 hover:bg-rose-500/20 border border-slate-800 hover:border-rose-400 rounded-xl transition-all"
          >
            <span className="text-rose-400 font-bold mr-4 group-hover:scale-125 transition-transform">🏠</span>
            <span className="text-white font-bold tracking-widest text-sm">去她異性朋友家找她</span>
          </button>

          {hasTestReport && (
            <button 
              onClick={() => onChoice(EndingType.Happy)}
              className="group flex items-center p-4 bg-rose-500/10 hover:bg-rose-500/30 border-2 border-rose-400 rounded-xl transition-all animate-pulse"
            >
              <span className="text-rose-400 font-bold mr-4 group-hover:scale-125 transition-transform">🏥</span>
              <span className="text-white font-bold tracking-widest text-sm">去醫院找她</span>
            </button>
          )}

          <button 
            onClick={() => onChoice(EndingType.Bad2)}
            className="group flex items-center p-4 bg-slate-900/50 hover:bg-rose-500/20 border border-slate-800 hover:border-rose-400 rounded-xl transition-all"
          >
            <span className="text-rose-400 font-bold mr-4 group-hover:scale-125 transition-transform">✉️</span>
            <span className="text-white font-bold tracking-widest text-sm">留下分手信離開這裡</span>
          </button>

          <button 
            onClick={() => onChoice(EndingType.None)}
            className="mt-4 p-3 text-slate-500 hover:text-white transition-colors text-xs font-bold tracking-[0.3em] uppercase"
          >
            繼續探索
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoiceOverlay;
