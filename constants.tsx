
import React from 'react';
import { Item, ItemId } from './types';

export const ITEMS: Record<ItemId, Item> = {
  room_key: {
    id: 'room_key',
    name: '備用鑰匙',
    icon: '🔑',
    description: '藏在盆栽底下的鑰匙，可以開啟玄關的大門。'
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
  }
};
