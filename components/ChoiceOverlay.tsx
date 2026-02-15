import React from 'react';
import { EndingType, ItemId } from '../types';

interface ChoiceOverlayProps {
  hasTestReport: boolean;
  hasMaleShirt: boolean;
  hasSeenChat: boolean;
  selectedItem: ItemId | null;
  onChoice: (ending: EndingType) => void;
}

const ChoiceOverlay: React.FC<ChoiceOverlayProps> = ({
  hasTestReport,
  hasMaleShirt,
  hasSeenChat,
  selectedItem,
  onChoice
}) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-white/40 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-[0_50px_100px_rgba(0,0,0,0.1)] text-center">
        <h2 className="text-slate-400 font-black tracking-[0.5em] uppercase text-[10px] mb-10">Decision Point</h2>
        <div className="space-y-4">

          {hasTestReport && (
            <button
              onClick={() => {
                // Implicit logic: if shirt is equipped, trigger Perfect ending
                if (selectedItem === 'male_shirt') {
                  onChoice(EndingType.Perfect);
                } else {
                  onChoice(EndingType.Happy);
                }
              }}
              className="group flex items-center p-5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-orange-300 rounded-2xl transition-all shadow-sm hover:shadow-md w-full"
            >
              <span className="text-xl mr-6 group-hover:scale-125 transition-transform">🌸</span>
              <div className="text-left">
                <p className="text-slate-700 font-black tracking-widest text-xs uppercase">前往醫院尋找她</p>
              </div>
            </button>
          )}

          <button
            onClick={() => onChoice(EndingType.Normal)}
            className="group flex items-center p-5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-orange-300 rounded-2xl transition-all shadow-sm hover:shadow-md w-full"
          >
            <span className="text-xl mr-6 group-hover:scale-125 transition-transform">🏙️</span>
            <div className="text-left">
              <p className="text-slate-700 font-black tracking-widest text-xs uppercase">去她工作地點找她</p>
            </div>
          </button>

          {hasSeenChat && (
            <button
              onClick={() => onChoice(EndingType.Bad1)}
              className="group flex items-center p-5 bg-slate-50 hover:bg-white border border-slate-100 hover:border-orange-300 rounded-2xl transition-all shadow-sm hover:shadow-md w-full"
            >
              <span className="text-xl mr-6 group-hover:scale-125 transition-transform">🏠</span>
              <div className="text-left">
                <p className="text-slate-700 font-black tracking-widest text-xs uppercase">去她異性朋友家找她</p>
              </div>
            </button>
          )}

          <button
            onClick={() => onChoice(EndingType.None)}
            className="w-full py-4 text-slate-300 hover:text-slate-600 font-black tracking-[0.3em] uppercase text-[10px] transition-colors mt-4"
          >
            回到房間繼續探索
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoiceOverlay;
