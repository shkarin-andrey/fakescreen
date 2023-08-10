/* eslint-disable simple-import-sort/imports */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload';
import { FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setAvatarFile } from '../../../redux/state/configSlice';
import { beforeUploadPNGAndJPEG } from '../../../utils/beforeUploadPNGAndJPEG';
import { getBase64 } from '../../../utils/getBase64';

const SettingsInterlocutorDownloadAvatar: FC = () => {
  const dispatch = useAppDispatch();

  const handleCustomRequest: UploadProps['customRequest'] = async ({
    onSuccess,
  }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') return;

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        dispatch(setAvatarFile(url));
      });
    }
  };

  const handleRemove: UploadProps['onRemove'] = () => {
    dispatch(setAvatarFile(null));
  };

  return (
    <ImgCrop rotationSlider modalTitle='Редактирование аватарки'>
      <Upload
        onChange={handleChange}
        customRequest={handleCustomRequest}
        beforeUpload={beforeUploadPNGAndJPEG}
        onRemove={handleRemove}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Загрузить</Button>
      </Upload>
    </ImgCrop>
  );
};

export default SettingsInterlocutorDownloadAvatar;
