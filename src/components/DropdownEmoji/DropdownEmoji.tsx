import { DownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC, memo, useCallback, useRef, useState } from 'react';

import EmojiIcon from '../../assets/icons/EmojiIcon';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { IDropdownEmoji } from './DropdownEmoji.interface';

const DropdownEmoji: FC<IDropdownEmoji> = ({ onEmojiClick, images }) => {
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
          <div className='max-w-[302px] flex flex-wrap gap-1 bg-gray-100/50 px-3 py-3 rounded-lg border border-gray-300 border-solid'>
            {images.map((item, index) => (
              <img
                aria-hidden={true}
                className='w-6 h-6 object-contain hover:bg-gray-200 rounded-sm cursor-pointer p-[2px]'
                key={`emoji-${index}`}
                alt={`emoji-${index}`}
                src={item}
                onClick={() => onEmojiClick(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(DropdownEmoji);
