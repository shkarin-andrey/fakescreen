import { DownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import { FC, memo, useCallback, useState } from 'react';

import EmojiIcon from '../../assets/icons/EmojiIcon';
import { IDropdownEmoji } from './DropdownEmoji.interface';

const MemoEmojiPicker = memo(EmojiPicker);

const DropdownEmoji: FC<IDropdownEmoji> = ({ onEmojiClick }) => {
  const [emojiVisible, setEmojiVisible] = useState(false);

  const handleOpenEmoji = useCallback(() => {
    setEmojiVisible((prev) => !prev);
  }, []);

  return (
    <div className='relative'>
      <Button className='flex items-center gap-1' onClick={handleOpenEmoji}>
        <EmojiIcon />
        <DownOutlined />
      </Button>
      {emojiVisible && (
        <div className={`absolute z-10 block`}>
          <MemoEmojiPicker
            emojiStyle={EmojiStyle.APPLE}
            onEmojiClick={onEmojiClick}
            lazyLoadEmojis
            searchPlaceHolder='Поиск'
            key={'emoji'}
          />
        </div>
      )}
    </div>
  );
};

export default memo(DropdownEmoji);
