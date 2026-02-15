
import React from 'react';

interface MessageOverlayProps {
  title: string;
  content: string;
  onClose: () => void;
}

const MessageOverlay: React.FC<MessageOverlayProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-8 pb-32 bg-white/20 backdrop-blur-[2px] pointer-events-none animate-in fade-in duration-500">
      <div className="max-w-2xl w-full glass-panel p-8 rounded-[2rem] border-2 border-white/60 bg-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.1)] pointer-events-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h3 className="text-xs font-black text-rose-500 mb-3 tracking-[0.4em] uppercase italic">
          — {title} —
        </h3>
        <p className="text-slate-700 text-base leading-relaxed font-bold tracking-wide italic whitespace-pre-wrap">
          {content}
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="text-[10px] font-black text-slate-400 hover:text-rose-500 transition-colors tracking-widest uppercase flex items-center group"
          >
            CONTINUE <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageOverlay;
