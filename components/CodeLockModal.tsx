import React, { useState } from 'react';

interface CodeLockModalProps {
  onUnlock: (code: string) => void;
  onClose: () => void;
}

const CodeLockModal: React.FC<CodeLockModalProps> = ({ onUnlock, onClose }) => {
  const [code, setCode] = useState('');

  const handleNum = (num: string) => {
    if (code.length < 4) setCode(prev => prev + num);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-white/40 backdrop-blur-xl animate-in zoom-in-95 duration-300">
      <div className="max-w-sm w-full bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_50px_100px_rgba(0,0,0,0.1)]">
        <h2 className="text-center text-slate-400 font-black tracking-[0.5em] uppercase text-[10px] mb-8">System Access</h2>
        <div className="h-24 bg-slate-50 rounded-2xl mb-8 flex items-center justify-center border-2 border-slate-100">
          <div className="text-4xl font-black tracking-[0.4em] text-slate-800 magical-font">
            {code.padEnd(4, '•')}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '✓'].map((val) => (
            <button
              key={val}
              onClick={() => {
                if (val === 'C') setCode('');
                else if (val === '✓') onUnlock(code);
                else handleNum(val.toString());
              }}
              className={`
                h-16 rounded-2xl font-black text-xl transition-all active:scale-95
                ${val === '✓' ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'}
              `}
            >
              {val}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 text-slate-300 hover:text-slate-600 font-black tracking-[0.3em] uppercase text-[10px] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CodeLockModal;
