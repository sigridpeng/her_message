
import React from 'react';
import { Item } from '../types';

interface ItemDetailModalProps {
    item: Item;
    onClose: () => void;
    onUse: () => void;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onUse }) => {
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-white/40 backdrop-blur-md animate-in fade-in duration-300">
            <div className="max-w-sm w-full bg-white/90 overflow-hidden rounded-[2.5rem] border border-slate-100 flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
                <div className="h-48 bg-gradient-to-b from-orange-50 to-transparent flex items-center justify-center text-7xl select-none">
                    <div className="animate-float drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
                        {item.icon}
                    </div>
                </div>

                <div className="p-8 pt-4 text-center">
                    <h2 className="text-xl font-black text-slate-800 mb-4 italic tracking-[0.2em] uppercase">
                        {item.name}
                    </h2>
                    <div className="w-10 h-0.5 bg-rose-200 mx-auto mb-6 rounded-full" />
                    <p className="text-slate-600 text-sm leading-loose italic mb-8 px-4">
                        "{item.description}"
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={onClose}
                            className="py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-400 font-bold rounded-2xl transition-all border border-slate-100 uppercase tracking-widest text-[10px]"
                        >
                            關閉
                        </button>
                        <button
                            onClick={() => {
                                onUse();
                                onClose();
                            }}
                            className="py-3 px-4 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-rose-200 uppercase tracking-widest text-[10px]"
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
