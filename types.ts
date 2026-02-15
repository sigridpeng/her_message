
export type ItemId = 'cabinet_key' | 'heart_key' | 'memory_usb' | 'handwritten_note' | 'test_report' | 'birthday_card' | 'male_shirt';

export interface Item {
  id: ItemId;
  name: string;
  icon: string;
  description: string;
}

export enum SceneId {
  Entrance = 'ENTRANCE',
  Desk = 'DESK',
  Bed = 'BED',
  Bathroom = 'BATHROOM'
}

export enum EndingType {
  None = 'NONE',
  Normal = 'NORMAL',
  Bad1 = 'BAD1',
  Happy = 'HAPPY',
  Bad2 = 'BAD2',
  Perfect = 'PERFECT'
}

export enum GamePhase {
  Title = 'TITLE',
  Story = 'STORY',
  Playing = 'PLAYING'
}

export interface GameState {
  phase: GamePhase;
  currentScene: SceneId;
  inventory: ItemId[];
  isLaptopLocked: boolean;
  isCabinetLocked: boolean;
  isDoorLocked: boolean;
  isLaptopFolderLocked: boolean;
  isNightstandLocked: boolean;
  ending: EndingType;
  hasSeenCalendar: boolean;
  hasSeenChat: boolean;
  selectedItem: ItemId | null;
}
