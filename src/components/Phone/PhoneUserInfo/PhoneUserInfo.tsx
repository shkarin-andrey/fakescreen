import { FC, memo, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import MuteIcon from '../../../assets/icons/MuteIcon';
import ShapeIcon from '../../../assets/icons/ShapeIcon';
import WriteIcon from '../../../assets/icons/WriteIcon';
import { options } from '../../../config';
import { useAppSelector } from '../../../hooks/useAppSelector';

const PhoneUserInfo: FC = () => {
  const username = useAppSelector((state) => state.config.username);
  const status = useAppSelector((state) => state.config.status);
  const bgAvatarColor = useAppSelector((state) => state.config.bgAvatarColor);
  const isUnread = useAppSelector((state) => state.config.isUnread);
  const unread = useAppSelector((state) => state.config.unread);
  const avatarFile = useAppSelector((state) => state.config.avatarFile);
  const mute = useAppSelector((state) => state.config.mute);

  const isStatusOnline = useMemo(() => {
    return status.props.id === options[1].label || status.props.id === options[0].label
      ? 'text-[#32A8E6]'
      : 'text-[#787878]';
  }, [status.props.id]);

  return (
    <div className='absolute top-[34px] left-0 z-[13] w-full h-[38px] pl-[6px] pr-[5px] grid grid-cols-[56px_1fr_56px] items-center text-xs font-semibold text-[#171717]'>
      <div className='text-[#037EE5] flex items-center gap-[3px] text-sm mt-[3px]'>
        <ShapeIcon />
        {isUnread ? (
          <div className='flex justify-center items-center text-white dark:text-black px-[4px] h-fit py-[1.5px] leading-none bg-[#007AFF] dark:bg-white rounded-full text-[10px] font-normal'>
            <div className='mb-[1px] pb-[0.5px]'>{unread}</div>
          </div>
        ) : (
          <span className='font-normal dark:text-white'>
            <FormattedMessage id='header_phone_back' />
          </span>
        )}
      </div>
      <div className='text-sm flex flex-col items-center leading-none pb-[2px]'>
        <div className='w-full flex items-end justify-center'>
          <span className='font-semibold truncate -tracking-[0.4px] text-[13px] pt-[5px] pb-[1px] dark:text-white mr-[3px]'>
            {username}
          </span>
          {mute && (
            <div>
              <MuteIcon />
            </div>
          )}
        </div>
        <div className={`text-[11px] font-normal ${isStatusOnline}`}>
          {status.props.id === options[0].label ? (
            <div className='flex items-center gap-1'>
              <div>
                <WriteIcon />
              </div>
              <span>{status}</span>
            </div>
          ) : (
            status
          )}
        </div>
      </div>
      <div
        className='avatar mt-[4px] ml-auto -pr-[0.5px] w-[29px] h-[29px] rounded-full overflow-hidden flex justify-center items-center text-white uppercase'
        style={{
          background: !avatarFile ? bgAvatarColor : undefined,
        }}
      >
        {!avatarFile ? (
          <div className='text-[13px]'>{username?.[0]}</div>
        ) : (
          <img src={avatarFile} alt='avatar' className='w-full h-full' />
        )}
      </div>
    </div>
  );
};

export default memo(PhoneUserInfo);
