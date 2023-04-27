import { DownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { FC, useState } from 'react';

import EmojiIcon from '../../assets/icons/EmojiIcon';

interface IDropdownEmoji {
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
}

const DropdownEmoji: FC<IDropdownEmoji> = ({ onEmojiClick }) => {
  const [emojiVisible, setEmojiVisible] = useState(false);

  const handleOpenEmoji = () => {
    setEmojiVisible((prev) => !prev);
  };

  return (
    <div className='relative'>
      <Button className='flex items-center gap-1' onClick={handleOpenEmoji}>
        <EmojiIcon />
        <DownOutlined />
      </Button>
      <div className={`absolute z-10 ${emojiVisible ? 'block' : 'hidden'}`}>
        <EmojiPicker
          emojiStyle={EmojiStyle.APPLE}
          onEmojiClick={onEmojiClick}
          lazyLoadEmojis
          searchPlaceHolder='Поиск'
        />
      </div>
    </div>
  );
};

export default DropdownEmoji;
