
import React from 'react';
import { ItemId } from '../types';
import { ITEMS } from '../constants';

interface InventoryUIProps {
  inventory: ItemId[];
  selectedItem: ItemId | null;
  onSelect: (id: ItemId) => void;
}

const InventoryUI: React.FC<InventoryUIProps & { onExamine: (id: ItemId) => void }> = ({
  inventory,
  selectedItem,
  onSelect,
  onExamine
}) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white/40 backdrop-blur-xl border border-white/60 p-5 rounded-[2.5rem] z-[40] shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
      <div className="flex items-center space-x-5 px-4 overflow-x-auto scrollbar-hide justify-center">
        <div className="text-orange-900/40 font-black italic mr-4 text-[10px] whitespace-nowrap tracking-[0.3em] uppercase">Memories</div>

        {Array.from({ length: 5 }).map((_, i) => {
          const itemId = inventory[i];
          const isSelected = selectedItem === itemId && itemId;

          return (
            <div
              key={i}
              className="relative group"
            >
              <div
                onClick={() => itemId && onSelect(itemId)}
                className={`
                  w-14 h-14 flex-shrink-0 rounded-2xl border-2 transition-all cursor-pointer
                  flex items-center justify-center text-2xl
                  ${isSelected
                    ? 'border-orange-300 bg-orange-100/50 scale-105 shadow-[0_10px_20px_rgba(251,146,60,0.15)]'
                    : 'border-slate-100 bg-white hover:border-orange-200'}
                `}
              >
                {itemId ? ITEMS[itemId].icon : <div className="w-1 h-1 bg-slate-200 rounded-full"></div>}
              </div>

              {itemId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onExamine(itemId);
                  }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border border-slate-100 text-[10px] text-orange-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-500 hover:text-white shadow-sm"
                >
                  i
                </button>
              )}
            </div>
          );
        })}
      </div>
      {selectedItem && (
        <div className="text-center mt-4 text-[9px] font-black text-orange-800/60 animate-pulse tracking-[0.4em] uppercase">
          — EQUIPPED: {ITEMS[selectedItem].name} —
        </div>
      )}
    </div>
  );
};

export default InventoryUI;
