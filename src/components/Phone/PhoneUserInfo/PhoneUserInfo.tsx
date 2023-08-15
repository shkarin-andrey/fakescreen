import { FC, memo, useMemo } from 'react';
import { FormattedMessage, FormattedRelativeTime } from 'react-intl';

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
  const theme = useAppSelector((state) => state.theme.theme);
  const network = useAppSelector((state) => state.config.network);

  const isStatusOnline = useMemo(() => {
    if (
      (status.id === options[1].label || status.id === options[0].label) &&
      network !== 'avia'
    ) {
      if (theme === 'dark') {
        return 'text-white';
      } else {
        return 'text-[#2F7BF4]';
      }
    }

    if (theme === 'dark') {
      return 'text-[#918F8F]';
    }

    return 'text-[#787878]';
  }, [status.id, theme, network]);

  const getStatus = () => {
    if (status.id === 'interlocutor_status_minutesAgo') {
      return (
        <FormattedMessage
          id={status.id}
          values={{
            time: <FormattedRelativeTime value={status?.time} unit={status?.unit} />,
          }}
        />
      );
    } else if (status.id === 'interlocutor_status_hourseAgo') {
      return (
        <FormattedMessage
          id={status.id}
          values={{
            time: <FormattedRelativeTime value={status?.time} unit={status?.unit} />,
          }}
        />
      );
    } else if (
      status.id === 'interlocutor_status_today' ||
      status.id === 'interlocutor_status_yesterday'
    ) {
      return (
        <FormattedMessage
          id={status.id}
          values={{
            time: status?.time,
          }}
        />
      );
    } else {
      return <FormattedMessage id={status.id} />;
    }
  };

  return (
    <div className='z-[13] w-full h-[37px] pl-[6px] pr-[5px] grid grid-cols-[56px_199px_56px] items-center text-xs font-semibold text-[#171717]'>
      <div className='text-[#037EE5] flex items-center gap-[3px] text-sm mt-[3px]'>
        <ShapeIcon />
        {isUnread ? (
          <div className='flex justify-center items-center text-white dark:text-black px-[4px] h-fit py-[1.5px] leading-none bg-[#007AFF] dark:bg-white rounded-full text-[10px] font-normal'>
            <div className=''>{unread}</div>
          </div>
        ) : (
          <span className='dark:text-white ml-[2px] mt-[1px] text-[13px] font-light -tracking-[0.1px]'>
            <FormattedMessage id='header_phone_back' />
          </span>
        )}
      </div>
      <div className='text-sm flex flex-col items-center leading-none pb-[2px]'>
        <div
          className={`w-full flex items-end justify-center ${
            mute ? 'translate-x-[4px]' : ''
          }`}
        >
          <div className='font-semibold truncate -tracking-[0.4px] text-[13px] pt-[5px] pb-[2px] dark:text-white mr-[3px]'>
            {username}
          </div>
          {mute && (
            <div className='-translate-y-[2px]'>
              <MuteIcon />
            </div>
          )}
        </div>
        <div className={`text-[10px] font-normal -mt-[1px] -ml-[1px] ${isStatusOnline}`}>
          {network === 'avia' ? (
            <FormattedMessage id='interlocutor_status_avia' />
          ) : status.id === options[0].label ? (
            <div className='flex items-center gap-1'>
              <div className='-translate-y-[1px]'>
                <WriteIcon />
              </div>
              <span>
                <FormattedMessage id={status.id} />
              </span>
            </div>
          ) : (
            getStatus()
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
