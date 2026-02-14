
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
      <div className="w-full max-w-6xl aspect-video relative group/scene shadow-2xl bg-slate-900 rounded-lg overflow-hidden border border-white/10">

        {/* 載入中動畫 */}
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-950/80 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 border-4 border-rose-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-6 text-rose-300 font-black italic tracking-[0.3em] animate-pulse uppercase">
                Scanning Fragment...
              </p>
            </div>
          </div>
        )}

        {/* 錯誤提示 */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-950 text-rose-400 p-8 text-center">
            <h3 className="text-xl font-black mb-2 uppercase italic tracking-widest">Image Load Failed</h3>
            <p className="text-xs text-slate-500 mb-4">{error}</p>
            <p className="text-xs text-slate-600 break-all max-w-md">{imageUrl}</p>
          </div>
        )}

        {/* 實際圖片 */}
        <img
          src={imageUrl}
          alt={currentScene}
          className={`w-full h-full object-cover block transition-opacity duration-1000 ${loading || error ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => {
            console.log(`SceneRenderer: Successfully loaded ${imageUrl}`);
            setLoading(false);
          }}
          onError={(e) => {
            console.error(`SceneRenderer: Failed to load ${imageUrl}`, e);
            setLoading(false);
            setError('The image could not be loaded. Please check the console for details.');
          }}
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-rose-500/5 to-transparent mix-blend-overlay" />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.6)]" />

        {!loading && (
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
