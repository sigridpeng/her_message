
import React from 'react';
import { Item } from '../types';

interface ItemDetailModalProps {
    item: Item;
    onClose: () => void;
    onUse: () => void;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onUse }) => {
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="max-w-sm w-full glass-panel overflow-hidden rounded-3xl border-2 border-rose-500/30 flex flex-col shadow-2xl shadow-rose-950/20">
                <div className="h-48 bg-gradient-to-b from-rose-500/20 to-transparent flex items-center justify-center text-7xl select-none">
                    <div className="animate-float drop-shadow-[0_0_15px_rgba(251,113,133,0.4)]">
                        {item.icon}
                    </div>
                </div>

                <div className="p-8 pt-4">
                    <h2 className="text-2xl font-black text-rose-300 mb-4 italic tracking-widest text-center uppercase">
                        {item.name}
                    </h2>
                    <div className="w-12 h-1 bg-rose-500/30 mx-auto mb-6 rounded-full" />
                    <p className="text-slate-300 text-sm leading-relaxed italic text-center mb-8 px-2">
                        "{item.description}"
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={onClose}
                            className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-slate-400 font-bold rounded-xl transition-all border border-slate-700 uppercase tracking-widest text-xs"
                        >
                            關閉
                        </button>
                        <button
                            onClick={() => {
                                onUse();
                                onClose();
                            }}
                            className="py-3 px-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-900/40 uppercase tracking-widest text-xs"
                        >
                            裝備物品
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailModal;
