
import React, { useState } from 'react';
import { SceneId, GameState, ItemId, EndingType } from './types';
import { ITEMS } from './constants';
import SceneRenderer from './components/SceneRenderer';
import InventoryUI from './components/InventoryUI';
import MessageOverlay from './components/MessageOverlay';
import CodeLockModal from './components/CodeLockModal';
import ChoiceOverlay from './components/ChoiceOverlay';
import { GoogleGenAI } from "@google/genai";

const STATIC_SCENES: Record<SceneId, string> = {
  [SceneId.Entrance]: 'entrance.jpg',
  [SceneId.Desk]: 'desk.jpg',
  [SceneId.Bed]: 'bed.jpg',
  [SceneId.Bathroom]: 'bathroom.jpg',
};

const SCENE_PROMPTS: Record<SceneId, string> = {
  [SceneId.Entrance]: "A realistic first-person view of a cozy apartment entrance, a small sofa on the right, a plant in the corner, cinematic lighting, mystery atmosphere, 16:9 aspect ratio.",
  [SceneId.Desk]: "A realistic first-person view of a messy wooden desk with a laptop, a bookshelf filled with books behind it, warm study lamp lighting, cinematic style, 16:9 aspect ratio.",
  [SceneId.Bed]: "A realistic first-person view of a bedroom corner, a tidy bed, a photo frame on the nightstand, a calendar on the wall with a heart marked on Sep 21, cinematic lighting, 16:9 aspect ratio.",
  [SceneId.Bathroom]: "A realistic first-person view of a clean modern bathroom, a large mirror, a scale on the floor, a light switch on the wall, cinematic lighting, 16:9 aspect ratio."
};

const App: React.FC = () => {
  const [state, setState] = useState<GameState>({
    currentScene: SceneId.Entrance,
    inventory: [],
    isLaptopLocked: true,
    isCabinetLocked: true,
    isDoorLocked: true,
    ending: EndingType.None,
    hasSeenCalendar: false,
    selectedItem: null,
  });

  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState<{ title: string; content: string } | null>(null);
  const [isCodeLockOpen, setIsCodeLockOpen] = useState(false);
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);

  const handleGenerateScene = async (sceneId: SceneId) => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: SCENE_PROMPTS[sceneId] }],
        },
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          setGeneratedImages(prev => ({ ...prev, [sceneId]: imageUrl }));
          break;
        }
      }
    } catch (error) {
      console.error("AI Generation Failed", error);
      setMessage({ title: '系統錯誤', content: '記憶修復失敗，請檢查網路連線或稍後再試。' });
    } finally {
      setIsGenerating(false);
    }
  };

  const resetGameProgress = () => {
    setState({
      currentScene: SceneId.Entrance,
      inventory: [],
      isLaptopLocked: true,
      isCabinetLocked: true,
      isDoorLocked: true,
      ending: EndingType.None,
      hasSeenCalendar: false,
      selectedItem: null,
    });
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
      case 'main_door': setIsChoiceOpen(true); break;
      case 'sofa': setMessage({ title: '沙發', content: '舒服的沙發，是她省錢了好一陣子才買下手的。' }); break;
      case 'plant': 
        if (!state.inventory.includes('room_key')) {
          setState(prev => ({ ...prev, inventory: [...prev.inventory, 'room_key'] }));
          setMessage({ title: '獲得碎片', content: '【備用鑰匙】\n藏在盆栽底下的鑰匙。' });
        } else {
          setMessage({ title: '盆栽', content: '葉片還帶著淡淡的水氣。' });
        }
        break;
      case 'cabinet': setMessage({ title: '矮櫃', content: '矮櫃上鎖了。' }); break;
      case 'calendar':
        setState(prev => ({ ...prev, hasSeenCalendar: true }));
        setMessage({ title: '月曆', content: '九月份的 21 號那天畫了一個小小的心。' });
        if (!state.inventory.includes('handwritten_note')) {
          setState(prev => ({ ...prev, inventory: [...prev.inventory, 'handwritten_note'] }));
        }
        break;
      case 'laptop':
        if (state.isLaptopLocked) setIsCodeLockOpen(true);
        else {
          setMessage({ title: '筆記型電腦', content: '螢幕上的草稿寫著關於未來的秘密。' });
          if (!state.inventory.includes('test_report')) {
            setState(prev => ({ ...prev, inventory: [...prev.inventory, 'test_report'] }));
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
        <div className="text-7xl mb-8 animate-float">{ending?.icon}</div>
        <h1 className="text-5xl font-black mb-6 text-rose-300 tracking-tighter uppercase italic">{ending?.title}</h1>
        <p className="text-xl text-slate-300 mb-10 max-w-lg leading-loose italic">{ending?.text}</p>
        <button onClick={resetGameProgress} className="px-12 py-4 bg-rose-500 hover:bg-rose-400 rounded-full font-black text-slate-950 transition-all transform hover:scale-110 shadow-lg shadow-rose-500/20">重新開始</button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-950 flex flex-col relative overflow-hidden">
      <div className="p-3 text-center bg-slate-900/80 border-b-4 border-slate-800 z-10">
        <h1 className="text-lg font-black tracking-[0.4em] text-rose-300 uppercase italic">
          {state.currentScene === SceneId.Entrance && 'Room Entrance'}
          {state.currentScene === SceneId.Desk && 'The Workspace'}
          {state.currentScene === SceneId.Bed && 'Bedroom Corner'}
          {state.currentScene === SceneId.Bathroom && 'Bathroom Side'}
        </h1>
      </div>
      <div className="flex-1 relative flex items-center justify-center bg-black/40">
        <button onClick={() => changeScene('prev')} className="absolute left-4 z-20 p-5 rounded-full bg-slate-900/40 text-white hover:bg-rose-500/40 transition-all border border-white/5">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <SceneRenderer 
          currentScene={state.currentScene} 
          imageUrl={generatedImages[state.currentScene] || STATIC_SCENES[state.currentScene]} 
          onInteract={handleObjectInteraction}
          onRepair={() => handleGenerateScene(state.currentScene)}
          isGenerating={isGenerating}
        />
        <button onClick={() => changeScene('next')} className="absolute right-4 z-20 p-5 rounded-full bg-slate-900/40 text-white hover:bg-rose-500/40 transition-all border border-white/5">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <InventoryUI 
        inventory={state.inventory} 
        selectedItem={state.selectedItem} 
        onSelect={(id) => setState(prev => ({ ...prev, selectedItem: prev.selectedItem === id ? null : id }))} 
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
    </div>
  );
};

export default App;
