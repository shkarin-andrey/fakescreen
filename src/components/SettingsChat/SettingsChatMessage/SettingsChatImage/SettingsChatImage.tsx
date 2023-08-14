import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { FC, useState } from 'react';

import { beforeUploadPNGAndJPEG } from '../../../../utils/beforeUploadPNGAndJPEG';
import { getBase64 } from '../../../../utils/getBase64';
import { handleCustomRequest } from '../../../../utils/handleCustomRequest';
import Wrapper from '../../../Wrapper';
import { ISettingsChatImage } from './SettingsChatImage.interface';

const SettingsChatImage: FC<ISettingsChatImage> = ({ image, setImage }) => {
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImage(url);
      });
    }
  };

  const handleDeleteAvatar = () => {
    setImage(null);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className='mt-2'>Загрузить</div>
    </div>
  );

  return (
    <Wrapper title='Загрузить изображение:'>
      <Upload
        listType='picture-card'
        showUploadList={false}
        onChange={handleChange}
        customRequest={handleCustomRequest}
        beforeUpload={beforeUploadPNGAndJPEG}
      >
        {image ? (
          <div className='group w-full h-full overflow-hidden relative'>
            <img src={image} alt='avatar' className='w-full h-full object-cover' />
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
    </Wrapper>
  );
};

export default SettingsChatImage;
