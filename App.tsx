
import React, { useState, useEffect, useRef } from 'react';
import { SceneId, GameState, ItemId, EndingType, GamePhase } from './types';
import { ITEMS } from './constants';
import SceneRenderer from './components/SceneRenderer';
import InventoryUI from './components/InventoryUI';
import MessageOverlay from './components/MessageOverlay';
import CodeLockModal from './components/CodeLockModal';
import ChoiceOverlay from './components/ChoiceOverlay';
import ItemDetailModal from './components/ItemDetailModal';

const STATIC_SCENES: Record<SceneId, string> = {
  [SceneId.Entrance]: '/entrance.png',
  [SceneId.Desk]: '/desk.png',
  [SceneId.Bed]: '/bed.png',
  [SceneId.Bathroom]: '/bathroom.png',
};

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<GameState>({
    phase: GamePhase.Title,
    currentScene: SceneId.Entrance,
    inventory: [],
    isLaptopLocked: true,
    isCabinetLocked: true,
    isDoorLocked: true,
    ending: EndingType.None,
    hasSeenCalendar: false,
    selectedItem: null,
  });

  const [storyStep, setStoryStep] = useState(0);
  const storyLines = [
    "前一晚，我們吵了架...",
    "而第二天，我前往她的住處，發現...",
    "她不見了...",
    "桌上遺留著我向她求婚的那枚戒指..."
  ];

  useEffect(() => {
    if (state.phase === GamePhase.Story) {
      const timer = setInterval(() => {
        setStoryStep(prev => {
          if (prev < storyLines.length) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 2500);
      return () => clearInterval(timer);
    }
  }, [state.phase]);

  const startPlaying = () => {
    setState(prev => ({ ...prev, phase: GamePhase.Playing }));
  };

  const handleStartGame = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
    setState(prev => ({ ...prev, phase: GamePhase.Story }));
  };

  const [message, setMessage] = useState<{ title: string; content: string } | null>(null);
  const [selectedExamineItem, setSelectedExamineItem] = useState<ItemId | null>(null);
  const [isCodeLockOpen, setIsCodeLockOpen] = useState(false);
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);

  const resetGameProgress = () => {
    setState({
      phase: GamePhase.Title,
      currentScene: SceneId.Entrance,
      inventory: [],
      isLaptopLocked: true,
      isCabinetLocked: true,
      isDoorLocked: true,
      ending: EndingType.None,
      hasSeenCalendar: false,
      selectedItem: null,
    });
    setStoryStep(0);
    setIsChoiceOpen(false);
    setIsCodeLockOpen(false);
  };

  const changeScene = (direction: 'next' | 'prev') => {
    const scenes = [SceneId.Entrance, SceneId.Desk, SceneId.Bed, SceneId.Bathroom];
    const currentIndex = scenes.indexOf(state.currentScene);
    const nextIndex = direction === 'next' ? (currentIndex + 1) % 4 : (currentIndex + 3) % 4;
    setState(prev => ({ ...prev, currentScene: scenes[nextIndex] }));
  };

  const handleObjectInteraction = (objectId: string) => {
    switch (objectId) {
      case 'main_door':
        if (state.isDoorLocked) {
          if (state.selectedItem === 'room_key') {
            setState(prev => ({ ...prev, isDoorLocked: false }));
            setMessage({ title: '解鎖成功', content: '用備用鑰匙打開了房門。' });
          } else {
            setMessage({ title: '房門', content: '門鎖住了，或許鑰匙就在附近。' });
          }
        } else {
          setIsChoiceOpen(true);
        }
        break;
      case 'sofa': setMessage({ title: '沙發', content: '舒服的沙發，是她省錢了好一陣子才買下手的。' }); break;
      case 'plant':
        if (!state.inventory.includes('room_key')) {
          setState(prev => ({ ...prev, inventory: [...prev.inventory, 'room_key'] }));
          setMessage({ title: '獲得碎片', content: '【備用鑰匙】\n藏在盆栽底下的鑰匙。' });
        } else {
          setMessage({ title: '盆栽', content: '葉片還帶著淡淡的水氣。' });
        }
        break;
      case 'cabinet':
        if (state.isCabinetLocked) {
          setMessage({ title: '矮櫃', content: '矮櫃上鎖了，似乎需要鑰匙（但我沒設計矮櫃鑰匙，所以這裡先略過）。' });
        } else {
          setMessage({ title: '矮櫃', content: '裡面整齊地疊著她的衣物。' });
        }
        break;
      case 'calendar':
        setState(prev => ({ ...prev, hasSeenCalendar: true }));
        setMessage({ title: '月曆', content: '九月份的 21 號那天畫了一個小小的心。' });
        if (!state.inventory.includes('handwritten_note')) {
          setState(prev => ({ ...prev, inventory: [...prev.inventory, 'handwritten_note'] }));
        }
        break;
      case 'laptop':
        if (state.isLaptopLocked) {
          setIsCodeLockOpen(true);
        } else {
          if (state.selectedItem === 'memory_usb') {
            setMessage({ title: '記憶隨身碟', content: '讀取了隨身碟。螢幕上顯示著她寄給未來的信...原來她一直都在對抗病魔。' });
            if (!state.inventory.includes('test_report') && state.hasSeenCalendar) {
              // Hinting at the test report if not already found
              setMessage({ title: '筆記型電腦', content: '隨身碟裡的文件提到了醫院的「檢驗報告」。' });
            }
          } else {
            setMessage({ title: '筆記型電腦', content: '螢幕上的草稿寫著關於未來的秘密。或許該插入隨身碟讀取更多資料。' });
          }
        }
        break;
      case 'bookshelf':
        if (!state.inventory.includes('memory_usb')) {
          setState(prev => ({ ...prev, inventory: [...prev.inventory, 'memory_usb'] }));
          setMessage({ title: '獲得碎片', content: '【記憶隨身碟】\n夾在書頁間的隨身碟。' });
        } else setMessage({ title: '書櫃', content: '滿滿的書，記錄著這裡的時光。' });
        break;
      case 'photo': setMessage({ title: '合照', content: '那張照片裡，我們都笑得好燦爛。' }); break;
      case 'scale': setMessage({ title: '體重計', content: '妳總說自己重了，但在我心裡妳一直都很完美。' }); break;
      case 'switch': setMessage({ title: '開關', content: '清脆的聲音在靜謐的房間迴盪。' }); break;
    }
  };

  if (state.phase === GamePhase.Title) {
    return (
      <div className="h-screen w-screen bg-slate-100 flex items-center justify-center relative overflow-hidden">
        <audio ref={audioRef} src="/bgm.mp3" autoPlay loop />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/entrance.png')" }}
        />
        <div className="relative z-20 text-center flex flex-col items-center">
          <h1 className="text-8xl font-black mb-12 text-rose-600 tracking-[0.2em] italic uppercase drop-shadow-2xl magical-font">
            Her <br /> Message
          </h1>
          <button
            onClick={handleStartGame}
            className="px-16 py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-black text-xl tracking-[0.5em] transition-all transform hover:scale-110 shadow-2xl animate-pulse"
          >
            START
          </button>
        </div>
      </div>
    );
  }

  if (state.phase === GamePhase.Story) {
    return (
      <div className="h-screen w-screen bg-[#FDF5E6] flex flex-col items-center justify-center p-8 transition-all duration-1000 relative overflow-hidden">
        <audio ref={audioRef} src="/bgm.mp3" autoPlay loop />
        {/* Background Ring */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[3000ms] ease-in-out pointer-events-none`}
          style={{
            backgroundImage: "url('/ring.png')",
            opacity: storyStep >= storyLines.length ? 0.3 : 0
          }}
        />

        <div className="max-w-2xl w-full flex flex-col items-center space-y-12 relative z-10">
          {storyLines.map((line, idx) => (
            <p
              key={idx}
              className={`text-2xl font-bold text-slate-800 italic transition-all duration-1000 ${storyStep > idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {line}
            </p>
          ))}

          <div className={`transition-all duration-1000 w-full flex flex-col items-center ${storyStep >= storyLines.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={startPlaying}
              className="mt-12 px-12 py-4 bg-slate-900 text-white rounded-full font-bold tracking-widest hover:bg-slate-800 transition-all uppercase text-sm border-2 border-slate-700 shadow-2xl"
            >
              進入房間
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state.ending !== EndingType.None) {
    const endings = {
      [EndingType.Normal]: { title: 'NORMAL END', text: '生活依舊繼續，只是少了某些色彩。', icon: '🏙️' },
      [EndingType.Bad1]: { title: 'BAD END 1', text: '我不該在那裡見到妳。信任的裂痕終究無法修補。', icon: '🌑' },
      [EndingType.Happy]: { title: 'HAPPY END', text: '在醫院的門口，我抱住了疲憊的妳。這一次，我們一起面對。', icon: '🌸' },
      [EndingType.Bad2]: { title: 'BAD END 2', text: '留下信的那刻，我以為我解脫了。', icon: '🍂' },
    };
    const ending = endings[state.ending as keyof typeof endings];
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-950 text-white p-8 text-center">
        <audio ref={audioRef} src="/bgm.mp3" autoPlay loop />
        <div className="text-7xl mb-8 animate-float">{ending?.icon}</div>
        <h1 className="text-5xl font-black mb-6 text-rose-300 tracking-tighter uppercase italic">{ending?.title}</h1>
        <p className="text-xl text-slate-300 mb-10 max-w-lg leading-loose italic">{ending?.text}</p>
        <button onClick={resetGameProgress} className="px-12 py-4 bg-rose-500 hover:bg-rose-400 rounded-full font-black text-slate-950 transition-all transform hover:scale-110 shadow-lg shadow-rose-500/20">重新開始</button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-950 relative overflow-hidden text-slate-100">
      <audio ref={audioRef} src="/bgm.mp3" autoPlay loop />
      <div className="absolute top-0 left-0 right-0 p-4 text-center bg-gradient-to-b from-slate-900/80 to-transparent z-10 pointer-events-none">
        <h1 className="text-xl font-black tracking-[0.4em] text-rose-300 uppercase italic drop-shadow-lg">
          {state.currentScene === SceneId.Entrance && 'Room Entrance'}
          {state.currentScene === SceneId.Desk && 'The Workspace'}
          {state.currentScene === SceneId.Bed && 'Bedroom Corner'}
          {state.currentScene === SceneId.Bathroom && 'Bathroom Side'}
        </h1>
      </div>
      <div className="h-full w-full relative flex items-center justify-center">
        <button onClick={() => changeScene('prev')} className="absolute left-6 z-20 p-5 rounded-full bg-slate-900/40 text-white hover:bg-rose-500/40 transition-all border border-white/5 backdrop-blur-sm">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <SceneRenderer
          currentScene={state.currentScene}
          imageUrl={STATIC_SCENES[state.currentScene]}
          onInteract={handleObjectInteraction}
        />
        <button onClick={() => changeScene('next')} className="absolute right-6 z-20 p-5 rounded-full bg-slate-900/40 text-white hover:bg-rose-500/40 transition-all border border-white/5 backdrop-blur-sm">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <InventoryUI
        inventory={state.inventory}
        selectedItem={state.selectedItem}
        onSelect={(id) => setState(prev => ({ ...prev, selectedItem: prev.selectedItem === id ? null : id }))}
        onExamine={(id) => setSelectedExamineItem(id)}
      />
      {message && <MessageOverlay title={message.title} content={message.content} onClose={() => setMessage(null)} />}
      {isCodeLockOpen && (
        <CodeLockModal
          onUnlock={(code) => {
            if (code === '0921') {
              setState(prev => ({ ...prev, isLaptopLocked: false }));
              setIsCodeLockOpen(false);
              setMessage({ title: '解鎖成功', content: '電腦解鎖了。' });
            } else setMessage({ title: '密碼錯誤', content: '這不是正確的日期。' });
          }}
          onClose={() => setIsCodeLockOpen(false)}
        />
      )}
      {isChoiceOpen && (
        <ChoiceOverlay
          hasTestReport={state.inventory.includes('test_report')}
          onChoice={(ending) => {
            if (ending === EndingType.None) setIsChoiceOpen(false);
            else setState(prev => ({ ...prev, ending }));
          }}
        />
      )}
      {selectedExamineItem && (
        <ItemDetailModal
          item={ITEMS[selectedExamineItem]}
          onClose={() => setSelectedExamineItem(null)}
          onUse={() => setState(prev => ({ ...prev, selectedItem: selectedExamineItem }))}
        />
      )}
    </div>
  );
};

export default App;
