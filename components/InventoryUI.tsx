
import React from 'react';
import { ItemId } from '../types';
import { ITEMS } from '../constants';

interface InventoryUIProps {
  inventory: ItemId[];
  selectedItem: ItemId | null;
  onSelect: (id: ItemId) => void;
}

const InventoryUI: React.FC<InventoryUIProps> = ({ inventory, selectedItem, onSelect }) => {
  return (
    <div className="bg-slate-900 border-t-2 border-slate-800 p-4 z-10">
      <div className="max-w-4xl mx-auto flex items-center space-x-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="text-rose-300 font-black italic mr-4 text-xs whitespace-nowrap tracking-widest">MEMORIES:</div>
        
        {Array.from({ length: 5 }).map((_, i) => {
          const itemId = inventory[i];
          const isSelected = selectedItem === itemId && itemId;
          
          return (
            <div 
              key={i}
              onClick={() => itemId && onSelect(itemId)}
              className={`
                w-14 h-14 flex-shrink-0 rounded-lg border-2 transition-all cursor-pointer
                flex items-center justify-center text-2xl
                ${isSelected 
                  ? 'border-rose-400 bg-rose-900/40 scale-105 shadow-[0_0_15px_rgba(251,113,133,0.4)]' 
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700'}
              `}
            >
              {itemId ? ITEMS[itemId].icon : <div className="w-1 h-1 bg-slate-800 rounded-full"></div>}
            </div>
          );
        })}
      </div>
      {selectedItem && (
        <div className="text-center mt-3 text-[10px] font-bold text-rose-200 animate-pulse tracking-widest uppercase">
          [ USING: {ITEMS[selectedItem].name} ]
        </div>
      )}
    </div>
  );
};

export default InventoryUI;
