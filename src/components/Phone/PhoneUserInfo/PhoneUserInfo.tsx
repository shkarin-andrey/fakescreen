import { Avatar } from 'antd';
import { FC } from 'react';

import ShapeIcon from '../../../assets/icons/ShapeIcon';
import { options } from '../../../config';
import { useAppSelector } from '../../../hooks/useAppSelector';

const PhoneUserInfo: FC = () => {
  const { username, status, bgAvatarColor, isUnread, unread, avatarFile } =
    useAppSelector((state) => state.config);

  const isStatusOnline =
    status === options[0].label ? 'text-[#32A8E6]' : 'text-[#787878]';

  return (
    <div className='w-full bg-[#F6F6F6] h-[38px] pl-[6px] pr-[5px] grid grid-cols-9 items-center text-xs font-semibold text-[#171717]'>
      <div className='text-[#037EE5] col-span-2 flex items-center gap-[6px] text-sm'>
        <ShapeIcon />
        {isUnread ? (
          <div className='flex justify-center items-center text-white h-5 w-5 bg-[#007AFF] rounded-full text-[11px]'>
            {unread}
          </div>
        ) : (
          <span className='font-normal'>Назад</span>
        )}
      </div>
      <div className='text-sm col-span-5 flex flex-col items-center leading-none'>
        <span className='font-semibold'>{username}</span>
        <span className={`text-xs font-normal ${isStatusOnline}`}>{status}</span>
      </div>
      <div
        className='avatar col-span-2 ml-auto w-8 h-8 rounded-full overflow-hidden flex justify-center items-center text-white uppercase'
        style={{
          background: avatarFile ? `url("${avatarFile}")` : bgAvatarColor,
        }}
      >
        {!avatarFile && <div className='text-[13px]'>{username?.[0]}</div>}
        {/* <Avatar
          size='large'
          src={avatarFile}
          className='w-full h-full flex justify-center items-center uppercase'
          style={{
            background: bgAvatarColor,
          }}
        >
          {username?.[0]}
        </Avatar> */}
      </div>
    </div>
  );
};

export default PhoneUserInfo;
