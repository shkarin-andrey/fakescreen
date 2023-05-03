import { EmojiClickData } from 'emoji-picker-react';

export interface IDropdownEmoji {
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
}
