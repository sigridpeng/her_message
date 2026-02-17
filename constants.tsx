
import React from 'react';
import { Item, ItemId } from './types';

export const ITEMS: Record<ItemId, Item> = {
  cabinet_key: {
    id: 'cabinet_key',
    name: '矮櫃鑰匙',
    icon: '🔑',
    description: '藏在盆栽底下的鑰匙。'
  },
  heart_key: {
    id: 'heart_key',
    name: '小鑰匙',
    icon: '🗝️',
    description: '一把造型精緻的小鑰匙。'
  },
  diary_page: {
    id: 'diary_page',
    name: '日記的內容',
    icon: '📜',
    description: '從日記本上面寫滿了字，描述了近期身體有點狀況，以及未來的計劃...最後寫到「要給他一個生日驚喜」'
  },
  birthday_card: {
    id: 'birthday_card',
    name: '生日卡片',
    icon: '✉️',
    description: '她送給我的生日卡片。上面寫著：「給最親愛的 Kael，希望我們能一直在一起。」'
  },
  male_shirt: {
    id: 'male_shirt',
    name: '男用襯衫',
    icon: '👔',
    description: '一件剪裁合身的男用襯衫，標籤還沒拆掉。這是我一直想要的那一款。'
  }
};
