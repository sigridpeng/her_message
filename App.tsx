
import React, { useState, useEffect, useRef } from 'react';
import { SceneId, GameState, ItemId, EndingType, GamePhase } from './types';
import { ITEMS } from './constants';
import SceneRenderer from './components/SceneRenderer';
import InventoryUI from './components/InventoryUI';
import MessageOverlay from './components/MessageOverlay';
import CodeLockModal from './components/CodeLockModal';
import ChoiceOverlay from './components/ChoiceOverlay';
import ItemDetailModal from './components/ItemDetailModal';
import LaptopModal from './components/LaptopModal';

const STATIC_SCENES: Record<SceneId, string> = {
  [SceneId.Entrance]: `${import.meta.env.BASE_URL}entrance.png`,
  [SceneId.Desk]: `${import.meta.env.BASE_URL}desk.png`,
  [SceneId.Bed]: `${import.meta.env.BASE_URL}bed.png`,
  [SceneId.Bathroom]: `${import.meta.env.BASE_URL}bathroom.png`,
};

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<GameState>({
    phase: GamePhase.Title,
    currentScene: SceneId.Entrance,
    inventory: [],
    isLaptopLocked: true,
    isCabinetLocked: true,
    isDoorLocked: false,
    isLaptopFolderLocked: true,
    isNightstandLocked: true,
    ending: EndingType.None,
    hasSeenCalendar: false,
    hasSeenChat: false,
    hasSeenBookshelf: false,
    selectedItem: null,
  });

  const [storyStep, setStoryStep] = useState(0);
  const storyLines = [
    "前一晚，我覺得她有事瞞我，所以吵了架...",
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
  const [discoveryImageUrl, setDiscoveryImageUrl] = useState<string | null>(null);
  const [isCodeLockOpen, setIsCodeLockOpen] = useState(false);
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);
  const [isLaptopOpen, setIsLaptopOpen] = useState(false);
  const [isNightstandLockOpen, setIsNightstandLockOpen] = useState(false);

  const resetGameProgress = () => {
    setState({
      phase: GamePhase.Title,
      currentScene: SceneId.Entrance,
      inventory: [],
      isLaptopLocked: true,
      isCabinetLocked: true,
      isDoorLocked: false,
      isLaptopFolderLocked: true,
      isNightstandLocked: true,
      ending: EndingType.None,
      hasSeenCalendar: false,
      hasSeenChat: false,
      hasSeenBookshelf: false,
      selectedItem: null,
    });
    setStoryStep(0);
    setIsChoiceOpen(false);
    setIsCodeLockOpen(false);
    setIsLaptopOpen(false);
    setIsNightstandLockOpen(false);
    setDiscoveryImageUrl(null);
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
        setIsChoiceOpen(true);
        break;
      case 'sofa': setMessage({ title: '沙發', content: '舒服的沙發，是她省錢了好一陣子才買下手的。' }); break;
      case 'window': setMessage({ title: '窗戶', content: '從這裡可以看到外面的街道，但現在只有灰濛濛的天空。' }); break;
      case 'plant1':
        if (state.hasSeenBookshelf) {
          if (!state.inventory.includes('cabinet_key')) {
            setState(prev => ({ ...prev, inventory: [...prev.inventory, 'cabinet_key'] }));
            setMessage({ title: '獲得碎片', content: '【矮櫃鑰匙】\n根據在書櫃發現的照片，妳在盆栽底下找到了這把鑰匙。' });
          } else {
            setMessage({ title: '盆栽', content: '鑰匙已經拿走了，泥土還有些鬆動。' });
          }
        } else {
          setMessage({ title: '盆栽', content: '葉片還帶著淡淡的水氣。' });
        }
        break;
      case 'cabinet':
        if (state.isCabinetLocked) {
          if (state.selectedItem === 'cabinet_key') {
            setState(prev => ({
              ...prev,
              isCabinetLocked: false,
              inventory: [...prev.inventory, 'heart_key']
            }));
            setMessage({ title: '解鎖成功', content: '用鑰匙打開了矮櫃，在抽屜夾層發現了【小鑰匙】。' });
          } else {
            setMessage({ title: '矮櫃', content: '門鎖住了，似乎需要特定的鑰匙。' });
          }
        } else {
          setMessage({ title: '矮櫃', content: '裡面整齊地疊著她的衣物，散發著淡淡的香氛。' });
        }
        break;
      case 'calendar':
        setState(prev => ({ ...prev, hasSeenCalendar: true }));
        setMessage({ title: '月曆', content: '九月份的 20 號，也就是今天，寫了請假，而21號則畫了一顆小小的愛心，原來她一直記得我的生日。' });
        break;
      case 'laptop':
        if (state.isLaptopLocked) {
          setIsCodeLockOpen(true);
        } else {
          setIsLaptopOpen(true);
        }
        break;
      case 'bookshelf':
        setState(prev => ({ ...prev, hasSeenBookshelf: true }));
        setDiscoveryImageUrl(`${import.meta.env.BASE_URL}bookshelf_discovery.png`);
        break;
      case 'drawer':
        if (!state.inventory.includes('birthday_card')) {
          setState(prev => ({ ...prev, inventory: [...prev.inventory, 'birthday_card'] }));
          setMessage({ title: '獲得卡片', content: '【生日卡片】\n抽屜裡放著一張精緻的卡片。' });
        } else {
          setMessage({ title: '抽屜', content: '抽屜裡裝滿了文具和雜物，但已經沒甚麼值得注意的。' });
        }
        break;
      case 'dairy':
        if (!state.inventory.includes('diary_page')) {
          if (state.selectedItem === 'heart_key') {
            setState(prev => ({ ...prev, inventory: [...prev.inventory, 'diary_page'] }));
            setMessage({ title: '解鎖成功', content: '用小鑰匙打開了日記本，裡面夾著一張【日記的一頁】。' });
          } else {
            setMessage({ title: '日記本', content: '精緻的日記本，封面上嵌著一個心形的鎖孔。' });
          }
        } else {
          setMessage({ title: '日記本', content: '最後的一頁日期停在我們吵架的前一天。' });
        }
        break;
      case 'bed': setMessage({ title: '床', content: '床鋪整理得很整規，像是她隨時會回來睡下。' }); break;
      case 'photo': setMessage({ title: '合照', content: '那張照片裡，我們都笑得好燦爛。' }); break;
      case 'nightstand':
        if (state.isNightstandLocked) {
          setIsNightstandLockOpen(true);
        } else if (!state.inventory.includes('male_shirt')) {
          setState(prev => ({ ...prev, inventory: [...prev.inventory, 'male_shirt'] }));
          setMessage({ title: '獲得驚喜', content: '【男用襯衫】\n床頭櫃解開了，裡面靜靜躺著這件襯衫。' });
        } else {
          setMessage({ title: '床頭櫃', content: '已經沒有甚麼值得注意的了。' });
        }
        break;
      case 'bathroom_door': setMessage({ title: '浴室門', content: '鏡子蒙上了一層水蒸氣，似乎有人剛離開。' }); break;
      case 'movie_poster': setMessage({ title: '電影海報', content: '那是我們第一次約會看的電影，她一直把海報貼在牆上。' }); break;
    }
  };

  if (state.phase === GamePhase.Title) {
    return (
      <div className="h-screen w-screen bg-slate-100 flex items-center justify-center relative overflow-hidden">
        <audio ref={audioRef} src={`${import.meta.env.BASE_URL}bgm.mp3`} autoPlay loop />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${import.meta.env.BASE_URL}entrance.png')` }}
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
        <audio ref={audioRef} src={`${import.meta.env.BASE_URL}bgm.mp3`} autoPlay loop />
        {/* Background Ring */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[4000ms] ease-in-out pointer-events-none`}
          style={{
            backgroundImage: `url('${import.meta.env.BASE_URL}ring.png')`,
            opacity: storyStep >= storyLines.length ? 0.4 : 0
          }}
        />

        <div className="max-w-2xl w-full flex flex-col items-center space-y-12 relative z-10 text-center">
          {storyLines.map((line, idx) => (
            <p
              key={idx}
              className={`text-2xl font-bold text-slate-800 italic transition-all duration-1000 ${storyStep > idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {line}
            </p>
          ))}

          <div className={`transition-all duration-1000 w-full flex flex-col items-center ${storyStep >= storyLines.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <button
              onClick={startPlaying}
              className="mt-12 px-12 py-4 bg-white text-slate-800 rounded-full font-bold tracking-widest hover:bg-slate-50 transition-all uppercase text-sm border-2 border-slate-200 shadow-xl"
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
      [EndingType.Normal]: { title: 'NORMAL END', text: '我沒能找到她，也許是我不夠了解她。', icon: '🏙️' },
      [EndingType.Bad1]: { title: 'BAD END 1', text: '我依照通訊軟體的訊息找到了那個人，把情況推向最難以收拾的局面。', icon: '🌑' },
      [EndingType.Happy]: { title: 'HAPPY END', text: '在醫院的門口，我抱住了疲憊的妳。這一次，我們一起面對。', icon: '🌸' },
      [EndingType.Bad2]: { title: 'BAD END 2', text: '留下信的那刻，我以為我解脫了。', icon: '🍂' },
      [EndingType.Perfect]: { title: 'PERFECT END', text: '穿著妳送我的襯衫，我在診間等著妳做完檢查。不論未來如何，這次我們不再分開。', icon: '✨' },
    };
    const ending = endings[state.ending as keyof typeof endings];
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-950 text-white p-8 text-center">
        <audio ref={audioRef} src={`${import.meta.env.BASE_URL}bgm.mp3`} autoPlay loop />
        <div className="text-7xl mb-8 animate-float">{ending?.icon}</div>
        <h1 className="text-5xl font-black mb-6 text-rose-300 tracking-tighter uppercase italic">{ending?.title}</h1>
        <p className="text-xl text-slate-300 mb-10 max-w-lg leading-loose italic">{ending?.text}</p>
        <button onClick={resetGameProgress} className="px-12 py-4 bg-rose-500 hover:bg-rose-400 rounded-full font-black text-slate-950 transition-all transform hover:scale-110 shadow-lg shadow-rose-500/20">重新開始</button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white relative overflow-hidden text-slate-900">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}bgm.mp3`} autoPlay loop />
      {discoveryImageUrl && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-12 cursor-pointer animate-in fade-in duration-300"
          onClick={() => setDiscoveryImageUrl(null)}
        >
          <div className="max-w-4xl w-full h-full flex flex-col items-center justify-center">
            <img src={discoveryImageUrl} alt="Discovery" className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-lg border-4 border-white/20" />
            <p className="mt-8 text-white/60 text-xs font-bold tracking-[0.5em] uppercase">Click anywhere to close</p>
          </div>
        </div>
      )}
      <div className="absolute top-0 left-0 right-0 p-6 text-center bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none">
        <h1 className="text-xl font-black tracking-[0.4em] text-orange-800 uppercase italic drop-shadow-sm">
          {state.currentScene === SceneId.Entrance && 'Room Entrance'}
          {state.currentScene === SceneId.Desk && 'The Workspace'}
          {state.currentScene === SceneId.Bed && 'Bedroom Corner'}
          {state.currentScene === SceneId.Bathroom && 'Bathroom Side'}
        </h1>
      </div>
      <div className="h-full w-full relative flex items-center justify-center bg-slate-50">
        <button onClick={() => changeScene('prev')} className="absolute left-6 z-20 p-5 rounded-full bg-white/60 text-slate-800 hover:bg-orange-100/60 transition-all border border-slate-200 backdrop-blur-sm shadow-md">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <SceneRenderer
          currentScene={state.currentScene}
          imageUrl={STATIC_SCENES[state.currentScene]}
          onInteract={handleObjectInteraction}
        />
        <button onClick={() => changeScene('next')} className="absolute right-6 z-20 p-5 rounded-full bg-white/60 text-slate-800 hover:bg-orange-100/60 transition-all border border-slate-200 backdrop-blur-sm shadow-md">
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
          hasDiaryPage={state.inventory.includes('diary_page')}
          hasMaleShirt={state.inventory.includes('male_shirt')}
          hasSeenChat={state.hasSeenChat}
          selectedItem={state.selectedItem}
          onChoice={(ending) => {
            if (ending === EndingType.None) setIsChoiceOpen(false);
            else setState(prev => ({ ...prev, ending }));
          }}
        />
      )}
      {isLaptopOpen && (
        <LaptopModal
          isLocked={state.isLaptopFolderLocked}
          onUnlockFolder={(pass) => {
            if (pass.toLowerCase() === 'kael') {
              setState(prev => ({ ...prev, isLaptopFolderLocked: false }));
              setMessage({ title: '存取成功', content: '資料夾解鎖了。' });
            } else {
              setMessage({ title: '存取拒絕', content: '這不是管理員的名字。' });
            }
          }}
          onViewChat={() => setState(prev => ({ ...prev, hasSeenChat: true }))}
          onClose={() => setIsLaptopOpen(false)}
        />
      )}
      {isNightstandLockOpen && (
        <CodeLockModal
          onUnlock={(code) => {
            if (code === '1225') {
              setState(prev => ({ ...prev, isNightstandLocked: false }));
              setIsNightstandLockOpen(false);
              setMessage({ title: '解鎖成功', content: '床頭櫃解鎖了，妳在裡面放了給我的禮物...' });
            } else setMessage({ title: '密碼錯誤', content: '密碼不正確。' });
          }}
          onClose={() => setIsNightstandLockOpen(false)}
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
