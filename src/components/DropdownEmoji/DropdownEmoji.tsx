import { DownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import { FC, memo, useCallback, useRef, useState } from 'react';

import EmojiIcon from '../../assets/icons/EmojiIcon';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { IDropdownEmoji } from './DropdownEmoji.interface';

const MemoEmojiPicker = memo(EmojiPicker);

const DropdownEmoji: FC<IDropdownEmoji> = ({ onEmojiClick }) => {
  const ref = useRef(null);
  const [emojiVisible, setEmojiVisible] = useState(false);

  const onClose = () => {
    setEmojiVisible(false);
  };

  useOutsideClick(ref, onClose, emojiVisible);

  const handleOpenEmoji = useCallback(() => {
    setEmojiVisible((prev) => !prev);
  }, []);

  return (
    <div ref={ref}>
      <Button className='flex items-center gap-1' onClick={handleOpenEmoji}>
        <EmojiIcon />
        <DownOutlined />
      </Button>
      {emojiVisible && (
        <div className={`absolute z-10 block right-0`}>
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
