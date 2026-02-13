
import React, { useState } from 'react';

interface CodeLockModalProps {
  onUnlock: (code: string) => void;
  onClose: () => void;
}

const CodeLockModal: React.FC<CodeLockModalProps> = ({ onUnlock, onClose }) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);

  const handleDigitChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newDigits = [...digits];
    newDigits[index] = val.slice(-1);
    setDigits(newDigits);
    
    if (val && index < 3) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = () => {
    onUnlock(digits.join(''));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel max-w-sm w-full p-8 rounded-3xl border-2 border-rose-500/30 shadow-2xl bg-slate-900/90">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-rose-300 font-black tracking-widest">DEVICE PASSCODE</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">✕</button>
        </div>
        
        <div className="flex justify-center space-x-4 mb-10">
          {[0, 1, 2, 3].map(i => (
            <input
              key={i}
              id={`digit-${i}`}
              type="text"
              inputMode="numeric"
              value={digits[i]}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              className="w-12 h-16 bg-slate-950 border-2 border-slate-800 rounded-xl text-3xl text-center focus:border-rose-500 focus:outline-none text-white font-black shadow-inner"
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setDigits(['', '', '', ''])}
            className="py-4 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl transition-all font-bold text-xs tracking-widest"
          >
            CLEAR
          </button>
          <button
            onClick={handleSubmit}
            className="py-4 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-rose-500/20 text-xs tracking-widest"
          >
            UNLOCK
          </button>
        </div>
        
        <p className="mt-8 text-[10px] text-slate-500 text-center italic tracking-widest uppercase">
          Hint: A date drawn with a heart on the calendar.
        </p>
      </div>
    </div>
  );
};

export default CodeLockModal;
