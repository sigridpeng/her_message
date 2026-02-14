
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 p-4 rounded-3xl z-[40] shadow-2xl shadow-black/50">
      <div className="flex items-center space-x-4 px-4 overflow-x-auto scrollbar-hide justify-center">
        <div className="text-rose-300 font-black italic mr-4 text-xs whitespace-nowrap tracking-widest">MEMORIES:</div>

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
                  w-14 h-14 flex-shrink-0 rounded-lg border-2 transition-all cursor-pointer
                  flex items-center justify-center text-2xl
                  ${isSelected
                    ? 'border-rose-400 bg-rose-900/40 scale-105 shadow-[0_0_15px_rgba(251,113,133,0.4)]'
                    : 'border-slate-800 bg-slate-950 hover:border-rose-500/30'}
                `}
              >
                {itemId ? ITEMS[itemId].icon : <div className="w-1 h-1 bg-slate-800 rounded-full"></div>}
              </div>

              {itemId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onExamine(itemId);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 rounded-full border border-slate-700 text-[10px] text-rose-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500 hover:text-white"
                >
                  i
                </button>
              )}
            </div>
          );
        })}
      </div>
      {selectedItem && (
        <div className="text-center mt-3 text-[10px] font-bold text-rose-200 animate-pulse tracking-widest uppercase">
          [ EQUIPPED: {ITEMS[selectedItem].name} ]
        </div>
      )}
    </div>
  );
};

export default InventoryUI;
