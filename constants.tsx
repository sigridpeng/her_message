
import React from 'react';
import { Item, ItemId } from './types';

export const ITEMS: Record<ItemId, Item> = {
  cabinet_key: {
    id: 'cabinet_key',
    name: '矮櫃鑰匙',
    icon: '🔑',
    description: '藏在盆栽底下的鑰匙，似乎可以用來開啟某個櫃子。'
  },
  heart_key: {
    id: 'heart_key',
    name: '心形小鑰匙',
    icon: '🗝️',
    description: '一把造型精緻的心形鑰匙，通常用來開啟日記本。'
  },
  memory_usb: {
    id: 'memory_usb',
    name: '記憶隨身碟',
    icon: '💾',
    description: '一個粉色的隨身碟，或許裡面存著她想說的話。'
  },
  handwritten_note: {
    id: 'handwritten_note',
    name: '手寫的紙條',
    icon: '📝',
    description: '上面寫著：「我會一直在那裡等你。」'
  },
  test_report: {
    id: 'test_report',
    name: '檢驗報告單',
    icon: '📋',
    description: '一份摺疊整齊的醫院報告，上面寫著妳一直瞞著我的秘密。'
  },
  birthday_card: {
    id: 'birthday_card',
    name: '生日卡片',
    icon: '🎂',
    description: '她送給我的生日卡片。上面寫著：「給最親愛的 Kael，希望我們能一直在一起。」'
  },
  male_shirt: {
    id: 'male_shirt',
    name: '男用襯衫',
    icon: '👔',
    description: '一件剪裁合身的男用襯衫，標籤還沒拆掉。這是我一直想要的那一款。'
  }
};
