
import React, { useState, useEffect } from 'react';
import { SceneId } from '../types';

interface SceneRendererProps {
  currentScene: SceneId;
  imageUrl: string;
  onInteract: (objectId: string) => void;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({ currentScene, imageUrl, onInteract }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`SceneRenderer: Loading scene ${currentScene} with URL: ${imageUrl}`);
    setLoading(true);
    setError(null);
  }, [imageUrl, currentScene]);

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-6xl aspect-video relative group/scene bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_50px_100px_rgba(0,0,0,0.08)]">

        {/* 載入中動畫 */}
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 relative">
                <div className="absolute inset-0 border-4 border-orange-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-8 text-orange-800/40 text-[10px] font-black italic tracking-[0.5em] animate-pulse uppercase">
                Synchronizing...
              </p>
            </div>
          </div>
        )}

        {/* 錯誤提示 */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-orange-50 text-orange-900 p-8 text-center">
            <h3 className="text-xl font-black mb-4 uppercase italic tracking-widest">Connection Lost</h3>
            <p className="text-xs text-orange-800/60 mb-6 italic">"{error}"</p>
            <p className="text-[10px] text-orange-800/40 break-all max-w-md font-mono">{imageUrl}</p>
          </div>
        )}

        {/* 實際圖片 */}
        <img
          src={imageUrl}
          alt={currentScene}
          className={`w-full h-full object-cover block transition-opacity duration-[2000ms] ${loading || error ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => {
            console.log(`SceneRenderer: Successfully loaded ${imageUrl}`);
            setLoading(false);
          }}
          onError={(e) => {
            console.error(`SceneRenderer: Failed to load ${imageUrl}`, e);
            setLoading(false);
            setError('The memory fragment could not be retrieved.');
          }}
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-orange-100/10 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.02)]" />

        {!loading && (
          <div className="absolute inset-0">
            {currentScene === SceneId.Entrance && (
              <>
                <div onClick={() => onInteract('main_door')} className="absolute left-[5%] top-[10%] w-[20%] h-[80%] cursor-pointer border-2 border-transparent hover:border-white/20 hover:bg-white/5 transition-all" title="房門" />
                <div onClick={() => onInteract('sofa')} className="absolute right-[28%] bottom-[5%] w-[35%] h-[30%] cursor-pointer hover:bg-white/5 transition-all" title="沙發" />
                <div onClick={() => onInteract('window')} className="absolute right-[28%] bottom-[50%] w-[35%] h-[50%] cursor-pointer hover:bg-white/5 transition-all" title="窗戶" />
                <div onClick={() => onInteract('cabinet')} className="absolute right-[2%] bottom-[5%] w-[20%] h-[20%] cursor-pointer hover:bg-white/5 transition-all" title="矮櫃" />
                <div onClick={() => onInteract('plant1')} className="absolute right-[8%] bottom-[25%] w-[10%] h-[25%] cursor-pointer hover:bg-white/5 transition-all" title="盆栽" />
              </>
            )}

            {currentScene === SceneId.Desk && (
              <>
                <div onClick={() => onInteract('bookshelf')} className="absolute left-[10%] top-[5%] w-[40%] h-[85%] cursor-pointer hover:bg-white/5 transition-all" title="大書櫃" />
                <div onClick={() => onInteract('drawer')} className="absolute left-[75%] top-[65%] w-[15%] h-[38%] cursor-pointer hover:bg-white/5 transition-all" title="抽屜" />
                <div onClick={() => onInteract('dairy')} className="absolute left-[75%] top-[58%] w-[12%] h-[4%] cursor-pointer hover:bg-white/5 transition-all" title="日記本" />
                <div onClick={() => onInteract('laptop')} className="absolute right-[30%] top-[50%] w-[10%] h-[20%] cursor-pointer group/laptop" title="筆電">
                  <div className="w-8 h-8 mx-auto mt-10 bg-blue-400 rounded-full animate-pulse opacity-0 group-hover/laptop:opacity-100" />
                </div>
              </>
            )}

            {currentScene === SceneId.Bed && (
              <>
                <div onClick={() => onInteract('bed')} className="absolute left-[25%] bottom-[20%] w-[50%] h-[35%] cursor-pointer hover:bg-white/10 transition-all" title="床" />
                <div onClick={() => onInteract('photo')} className="absolute right-[12%] bottom-[40%] w-[6%] h-[15%] cursor-pointer hover:bg-white/10 transition-all" title="照片" />
                <div onClick={() => onInteract('calendar')} className="absolute right-[45%] top-[8%] w-[10%] h-[20%] cursor-pointer hover:bg-white/10 transition-all" title="月曆" />
                <div onClick={() => onInteract('nightstand')} className="absolute right-[10%] top-[55%] w-[15%] h-[15%] cursor-pointer hover:bg-white/10 transition-all" title="床頭櫃" />
              </>
            )}

            {currentScene === SceneId.Bathroom && (
              <>
                <div onClick={() => onInteract('bathroom_door')} className="absolute left-[25%] bottom-[0%] w-[25%] h-[100%] cursor-pointer hover:bg-white/10 transition-all" title="浴室門" />
                <div onClick={() => onInteract('movie_poster')} className="absolute right-[20%] top-[5%] w-[20%] h-[40%] cursor-pointer hover:bg-white/10 transition-all" title="電影海報" />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneRenderer;
