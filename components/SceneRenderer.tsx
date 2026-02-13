
import React, { useState, useEffect } from 'react';
import { SceneId } from '../types';

interface SceneRendererProps {
  currentScene: SceneId;
  imageUrl: string;
  onInteract: (objectId: string) => void;
  onRepair: () => void;
  isGenerating: boolean;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({ currentScene, imageUrl, onInteract, onRepair, isGenerating }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [imageUrl]);

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-6xl aspect-video relative group/scene shadow-2xl bg-slate-900 rounded-lg overflow-hidden border border-white/10">
        
        {/* 載入中動畫 */}
        {(loading || isGenerating) && !error && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-950/80 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 border-4 border-rose-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-6 text-rose-300 font-black italic tracking-[0.3em] animate-pulse uppercase">
                {isGenerating ? 'Reconstructing Memory...' : 'Scanning Fragment...'}
              </p>
            </div>
          </div>
        )}

        {/* 錯誤提示：提供 AI 修復按鈕 */}
        {error && !isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-950 text-slate-400 p-8 text-center">
            <div className="relative mb-6">
              <span className="text-7xl opacity-20">🖼️</span>
              <div className="absolute inset-0 flex items-center justify-center text-rose-500 text-3xl font-black">?</div>
            </div>
            <h3 className="text-xl font-black text-rose-300 mb-2 tracking-widest uppercase italic">Memory Fragment Missing</h3>
            <p className="text-sm leading-relaxed max-w-sm mb-8 text-slate-500 italic">
              找不到該處的記憶影像，是否嘗試使用 AI 重新構築場景？
            </p>
            
            <button 
              onClick={onRepair}
              className="group relative px-8 py-3 bg-rose-600 hover:bg-rose-500 text-slate-950 font-black rounded-full transition-all transform hover:scale-105 shadow-lg shadow-rose-900/40"
            >
              <span className="relative z-10 flex items-center tracking-widest text-xs uppercase">
                <svg className="w-4 h-4 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.464 15.657a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zM19.101 4L14 7.101l1 1L20.101 5l-1-1zM10 14a4 4 0 100-8 4 4 0 000 8z" /></svg>
                修復此段記憶 (Reconstruct)
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity"></div>
            </button>
          </div>
        )}

        {/* 實際圖片 */}
        <img 
          src={imageUrl} 
          alt={currentScene} 
          className={`w-full h-full object-cover block transition-opacity duration-1000 ${loading || isGenerating ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
        
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-rose-500/5 to-transparent mix-blend-overlay" />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.6)]" />

        {!loading && !error && !isGenerating && (
          <div className="absolute inset-0">
            {currentScene === SceneId.Entrance && (
              <>
                <div onClick={() => onInteract('main_door')} className="absolute left-[5%] top-[10%] w-[20%] h-[80%] cursor-pointer border-2 border-transparent hover:border-white/20 hover:bg-white/5 transition-all" title="房門" />
                <div onClick={() => onInteract('sofa')} className="absolute right-[5%] bottom-[5%] w-[35%] h-[30%] cursor-pointer hover:bg-white/5 transition-all" title="沙發" />
                <div onClick={() => onInteract('cabinet')} className="absolute right-[40%] bottom-[5%] w-[15%] h-[20%] cursor-pointer hover:bg-white/5 transition-all" title="矮櫃" />
                <div onClick={() => onInteract('plant')} className="absolute right-[42%] bottom-[25%] w-[10%] h-[15%] cursor-pointer group/plant">
                   <div className="w-4 h-4 mx-auto mt-4 bg-rose-400 rounded-full animate-ping opacity-0 group-hover/plant:opacity-100" />
                </div>
              </>
            )}

            {currentScene === SceneId.Desk && (
              <>
                <div onClick={() => onInteract('bookshelf')} className="absolute left-[10%] top-[5%] w-[30%] h-[85%] cursor-pointer hover:bg-white/5 transition-all" title="大書櫃" />
                <div onClick={() => onInteract('laptop')} className="absolute right-[15%] top-[40%] w-[30%] h-[40%] cursor-pointer group/laptop" title="筆電">
                   <div className="w-8 h-8 mx-auto mt-10 bg-blue-400 rounded-full animate-pulse opacity-0 group-hover/laptop:opacity-100" />
                </div>
              </>
            )}

            {currentScene === SceneId.Bed && (
              <>
                <div onClick={() => onInteract('photo')} className="absolute left-[5%] bottom-[20%] w-[15%] h-[25%] cursor-pointer hover:bg-white/10 transition-all" title="照片" />
                <div onClick={() => onInteract('calendar')} className="absolute right-[15%] top-[10%] w-[15%] h-[30%] cursor-pointer border-2 border-transparent hover:border-rose-400/30 transition-all" title="月曆" />
              </>
            )}

            {currentScene === SceneId.Bathroom && (
              <>
                <div onClick={() => onInteract('switch')} className="absolute right-[25%] top-[45%] w-8 h-12 cursor-pointer bg-white/5 border border-white/10 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all" title="開關" />
                <div onClick={() => onInteract('scale')} className="absolute left-[40%] bottom-[5%] w-[20%] h-[15%] cursor-pointer hover:bg-white/5 transition-all" title="體重計" />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneRenderer;
