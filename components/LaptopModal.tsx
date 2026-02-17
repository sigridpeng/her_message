import React, { useState } from 'react';

interface LaptopModalProps {
    isLocked: boolean;
    onUnlockFolder: (password: string) => void;
    onViewChat?: () => void;
    onClose: () => void;
}

type View = 'desktop' | 'chat' | 'search' | 'shop' | 'folder';

const LaptopModal: React.FC<LaptopModalProps> = ({ isLocked, onUnlockFolder, onViewChat, onClose }) => {
    const [currentView, setCurrentView] = useState<View>('desktop');
    const [password, setPassword] = useState('');

    const renderContent = () => {
        switch (currentView) {
            case 'desktop':
                return (
                    <div className="grid grid-cols-4 gap-8 p-12 h-full content-start">
                        <button
                            onClick={() => {
                                setCurrentView('chat');
                                if (onViewChat) onViewChat();
                            }}
                            className="flex flex-col items-center group"
                        >
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform">💬</div>
                            <span className="mt-2 text-xs font-bold text-slate-600">WeChat</span>
                        </button>
                        <button onClick={() => setCurrentView('search')} className="flex flex-col items-center group">
                            <div className="w-16 h-16 bg-orange-400 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform">🌐</div>
                            <span className="mt-2 text-xs font-bold text-slate-600">Search</span>
                        </button>
                        <button onClick={() => setCurrentView('shop')} className="flex flex-col items-center group">
                            <div className="w-16 h-16 bg-rose-400 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform">🛒</div>
                            <span className="mt-2 text-xs font-bold text-slate-600">Shopping</span>
                        </button>
                        <button onClick={() => setCurrentView('folder')} className="flex flex-col items-center group">
                            <div className="w-16 h-16 bg-amber-200 rounded-2xl flex items-center justify-center text-amber-600 text-3xl shadow-lg group-hover:scale-110 transition-transform">📁</div>
                            <span className="mt-2 text-xs font-bold text-slate-600">Secret</span>
                        </button>
                    </div>
                );
            case 'chat':
                return (
                    <div className="p-6 h-full flex flex-col bg-white">
                        <div className="flex items-center mb-6 pb-4 border-b border-slate-100">
                            <button onClick={() => setCurrentView('desktop')} className="mr-4 text-slate-400 hover:text-slate-800">← Back</button>
                            <h3 className="font-bold text-slate-800">Chat: 學長</h3>
                        </div>
                        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                            <div className="bg-slate-100 p-3 rounded-2xl max-w-[80%] self-start text-sm">
                                上次跟你提到的，那個牌子的襯衫你買了嗎？
                            </div>
                            <div className="bg-slate-100 p-3 rounded-2xl max-w-[80%] self-start text-sm">
                                我覺得質料很好，誰收到都會很開心的。
                            </div>
                            <div className="bg-rose-100 p-3 rounded-2xl max-w-[80%] self-end ml-auto text-sm text-rose-800">
                                我也是這麼覺得，我明天下班就要偷偷去買了。
                            </div>
                            <div className="bg-slate-100 p-3 rounded-2xl max-w-[80%] self-start text-sm">
                                你要買什麼顏色的？
                            </div>
                            <div className="bg-rose-100 p-3 rounded-2xl max-w-[80%] self-end ml-auto text-sm text-rose-800">
                                我想買深藍色的，你覺得呢？
                            </div>
                            <div className="bg-slate-100 p-3 rounded-2xl max-w-[80%] self-start text-sm">
                                好眼光！我也有一件同樣色系的，是很熱賣的顏色。
                            </div>
                            <div className="bg-rose-100 p-3 rounded-2xl max-w-[80%] self-end ml-auto text-sm text-rose-800">
                                真的嗎？那我就放心了，謝謝學長！
                            </div>
                        </div>
                    </div>
                );
            case 'search':
                return (
                    <div className="p-6 h-full flex flex-col bg-white">
                        <div className="flex items-center mb-6 pb-4 border-b border-slate-100">
                            <button onClick={() => setCurrentView('desktop')} className="mr-4 text-slate-400 hover:text-slate-800">← Back</button>
                            <h3 className="font-bold text-slate-800">Browser History</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50">
                                <p className="text-blue-600 font-bold mb-1 underline cursor-pointer">MRI 磁振造影 報告解讀指南</p>
                                <p className="text-xs text-slate-400 italic">2 hours ago</p>
                            </div>
                            <div className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50">
                                <p className="text-blue-600 font-bold mb-1 underline cursor-pointer">腦部膠質瘤 初期徵兆與治療成功率</p>
                                <p className="text-xs text-slate-400 italic">5 hours ago</p>
                            </div>
                            <div className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50">
                                <p className="text-blue-600 font-bold mb-1 underline cursor-pointer">如何向親人隱瞞病情並不讓他們難過</p>
                                <p className="text-xs text-slate-400 italic">Yesterday</p>
                            </div>
                        </div>
                    </div>
                );
            case 'shop':
                return (
                    <div className="p-6 h-full flex flex-col bg-white">
                        <div className="flex items-center mb-6 pb-4 border-b border-slate-100">
                            <button onClick={() => setCurrentView('desktop')} className="mr-4 text-slate-400 hover:text-slate-800">← Back</button>
                            <h3 className="font-bold text-slate-800">Shopping History</h3>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl flex items-center space-x-4 border border-slate-100">
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">👔</div>
                            <div>
                                <p className="font-bold text-slate-800">品牌男用正式襯衫 (藏青色)</p>
                                <p className="text-xs text-slate-500">Status: Delivered to Nightstand Safe</p>
                                <p className="text-rose-500 font-black mt-1">$ 3,200</p>
                            </div>
                        </div>
                    </div>
                );
            case 'folder':
                if (isLocked) {
                    return (
                        <div className="p-12 h-full flex flex-col items-center justify-center bg-white">
                            <div className="text-6xl mb-6">🔒</div>
                            <h3 className="font-bold text-lg mb-4 text-slate-800 tracking-widest uppercase">PRIVATE FOLDER</h3>
                            <p className="text-xs text-slate-400 mb-8 italic">Please enter the password.</p>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="password"
                                    className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-center font-black tracking-widest uppercase focus:ring-2 focus:ring-rose-500 outline-none"
                                />
                                <button
                                    onClick={() => onUnlockFolder(password)}
                                    className="bg-rose-500 text-white px-6 py-2 rounded-xl font-bold uppercase hover:bg-rose-600 transition-colors"
                                >
                                    OK
                                </button>
                            </div>
                            <button onClick={() => setCurrentView('desktop')} className="mt-8 text-slate-300 hover:text-slate-500 text-[10px] font-bold uppercase tracking-widest">Go Back</button>
                        </div>
                    );
                }
                return (
                    <div className="p-6 h-full flex flex-col bg-white">
                        <div className="flex items-center mb-6 pb-4 border-b border-slate-100">
                            <button onClick={() => setCurrentView('desktop')} className="mr-4 text-slate-400 hover:text-slate-800">← Back</button>
                            <h3 className="font-bold text-slate-800">Folder: Our Memories</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-2 flex flex-col items-center space-y-6">
                            <div className="w-full aspect-video bg-slate-100 rounded-3xl overflow-hidden relative border-4 border-white shadow-xl shrink-0">
                                <img src="/bed.png" className="w-full h-full object-cover blur-[2px] opacity-60" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800">
                                    <div className="text-4xl mb-2">📸</div>
                                    <p className="font-black text-xl tracking-tighter">PHOTO_20201225_FINAL.JPG</p>
                                    <p className="text-[10px] mt-4 font-bold bg-white/80 px-4 py-1 rounded-full text-rose-500 tracking-[0.3em]">
                                        CREATION DATE: 1225
                                    </p>
                                </div>
                            </div>
                            <p className="text-center text-xs text-slate-500 italic px-8 pb-4">
                                床頭櫃的密碼是我們決定在一起的日子。
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-8 bg-black/20 backdrop-blur-md animate-in fade-in duration-500">
            <div className="max-w-4xl w-full aspect-video bg-slate-50 rounded-[2.5rem] border-[12px] border-slate-800 shadow-[0_60px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col relative">
                {/* Header Bar */}
                <div className="h-10 bg-slate-800 flex items-center justify-end px-4 shrink-0">
                    <button
                        onClick={onClose}
                        className="w-4 h-4 rounded-full bg-rose-500 hover:bg-rose-400 transition-colors flex items-center justify-center text-[10px] font-black text-white"
                    >
                        ×
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden">
                    {renderContent()}
                </div>

                {/* Bottom Bar */}
                <div className="h-12 bg-slate-200/50 flex items-center px-6 shrink-0 border-t border-slate-300/30">
                    <div className="w-6 h-6 bg-slate-800 rounded-lg flex items-center justify-center text-[10px] text-white">🪟</div>
                </div>
            </div>
        </div>
    );
};

export default LaptopModal;
