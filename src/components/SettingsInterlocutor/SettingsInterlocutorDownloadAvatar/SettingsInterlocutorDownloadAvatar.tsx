import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { FC, useState } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setAvatarFile } from '../../../redux/state/configSlice';
import { beforeUploadPNGAndJPEG } from '../../../utils/beforeUploadPNGAndJPEG';
import Wrapper from '../../Wrapper';

const SettingsInterlocutorDownloadAvatar: FC = () => {
  const [loading, setLoading] = useState(false);

  const avatarFile = useAppSelector((state) => state.config.avatarFile);
  const dispatch = useAppDispatch();

  const handleCustomRequest: UploadProps['customRequest'] = async ({
    onSuccess,
  }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      const url = URL.createObjectURL(info.file.originFileObj as any);

      setLoading(false);
      dispatch(setAvatarFile(url));
    }
  };

  const handleDeleteAvatar = () => {
    dispatch(setAvatarFile(null));
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className='mt-2'>Загрузить</div>
    </div>
  );

  return (
    <Wrapper title='Загрузить аватарку:'>
      <ImgCrop rotationSlider modalTitle='Редактирование аватарки'>
        <Upload
          listType='picture-circle'
          showUploadList={false}
          onChange={handleChange}
          customRequest={handleCustomRequest}
          beforeUpload={beforeUploadPNGAndJPEG}
        >
          {avatarFile ? (
            <div className='group w-full h-full overflow-hidden rounded-full relative'>
              <img src={avatarFile} alt='avatar' className='w-full h-full object-cover' />
              <div
                aria-hidden
                onClick={handleDeleteAvatar}
                className='absolute w-full h-full top-0 left-0 flex justify-center items-center bg-gray-700/80 text-white opacity-0 group-hover:opacity-100 transition-all'
              >
                <DeleteOutlined className='text-red-600 text-3xl' />
              </div>
            </div>
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>
    </Wrapper>
  );
};

export default SettingsInterlocutorDownloadAvatar;
