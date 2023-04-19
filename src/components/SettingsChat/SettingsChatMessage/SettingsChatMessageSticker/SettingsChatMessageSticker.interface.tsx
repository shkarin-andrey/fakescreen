export interface ISettingsChatMessageSticker {
  select: string | null;
  onSelect: (sticker: string) => void;
}
