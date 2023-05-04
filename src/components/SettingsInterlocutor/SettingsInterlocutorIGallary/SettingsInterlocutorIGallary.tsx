import { PlusOutlined } from '@ant-design/icons';
import { Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { FC, useState } from 'react';

import { setBgImage } from '../../../redux/state/configSlice';
import { beforeUploadPNGAndJPEG } from '../../../utils/beforeUploadPNGAndJPEG';
import { useAppDispatch } from './../../../hooks/useAppDispatch';
import { gallary } from './SettingsInterlocutorIGallary.config';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const SettingsInterlocutorIGallary: FC = () => {
  const dispatch = useAppDispatch();

  const [fileList, setFileList] = useState<UploadFile[]>(gallary);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    dispatch(setBgImage(file.preview));
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    setFileList(info.fileList);
  };

  const handleCustomRequest: UploadProps['customRequest'] = async ({
    onSuccess,
  }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='font-medium text-base'>Галерея:</div>

      <Upload
        listType='picture-card'
        fileList={fileList}
        onChange={handleChange}
        onPreview={handlePreview}
        customRequest={handleCustomRequest}
        beforeUpload={beforeUploadPNGAndJPEG}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Загрузить</div>
        </div>
      </Upload>
    </div>
  );
};

export default SettingsInterlocutorIGallary;
