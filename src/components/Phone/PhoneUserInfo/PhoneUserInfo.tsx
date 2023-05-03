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
    <div className='w-full bg-[#F6F6F6] h-[38px] pl-[6px] pr-[5px] grid grid-cols-9 items-center text-xs font-semibold text-[#171717] border-b border-0 border-solid border-[#E8E8E8]'>
      <div className='text-[#037EE5] col-span-2 flex items-center gap-[6px] text-sm mt-[2px]'>
        <ShapeIcon />
        {isUnread ? (
          <div className='flex justify-center items-center text-white px-[5px] h-fit py-[1px] leading-none bg-[#007AFF] rounded-full text-[10px] font-normal'>
            <div className='mb-[2px]'>{unread}</div>
          </div>
        ) : (
          <span className='font-normal'>
            <FormattedMessage id='header_phone_back' />
          </span>
        )}
      </div>
      <div className='text-sm col-span-5 flex flex-col items-center leading-none pb-[2px]'>
        <div className='flex items-end gap-[4px]'>
          <span className='font-semibold'>{username}</span>
          {mute && (
            <div>
              <MuteIcon />
            </div>
          )}
        </div>
        <div className={`text-[11px] pt-[1px] font-normal ${isStatusOnline}`}>
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
        className='avatar col-span-2 ml-auto w-8 h-8 rounded-full overflow-hidden flex justify-center items-center text-white uppercase'
        style={{
          background: avatarFile
            ? `url("${avatarFile}") center center/cover no-repeat`
            : bgAvatarColor,
        }}
      >
        {!avatarFile && <div className='text-[13px]'>{username?.[0]}</div>}
      </div>
    </div>
  );
};

export default memo(PhoneUserInfo);
