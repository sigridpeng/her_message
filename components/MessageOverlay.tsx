
import React from 'react';

interface MessageOverlayProps {
  title: string;
  content: string;
  onClose: () => void;
}

const MessageOverlay: React.FC<MessageOverlayProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-8 bg-slate-950/40 backdrop-blur-[2px]" onClick={onClose}>
      <div 
        className="w-full max-w-4xl bg-slate-900/90 border-t-4 border-rose-400/50 p-8 rounded-t-xl shadow-2xl transform animate-in slide-in-from-bottom-8 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center mb-4">
          <div className="px-6 py-1 bg-rose-500 text-slate-950 font-black text-sm rounded-sm mr-4 tracking-tighter">
            {title}
          </div>
          <div className="h-[1px] flex-1 bg-slate-700"></div>
        </div>
        <p className="text-white text-lg font-medium leading-loose mb-6 italic">
          {content}
        </p>
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="text-rose-300 font-black text-xs tracking-widest animate-pulse hover:text-white transition-colors"
          >
            CONTINUE ...
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageOverlay;
