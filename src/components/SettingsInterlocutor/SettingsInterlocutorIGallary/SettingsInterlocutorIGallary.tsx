import { UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { FC, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Grid, Mousewheel, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { setBgImage } from '../../../redux/state/configSlice';
import { beforeUploadPNGAndJPEG } from '../../../utils/beforeUploadPNGAndJPEG';
import { handleCustomRequest } from '../../../utils/handleCustomRequest';
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

  const handleChange: UploadProps['onChange'] = (info) => {
    setFileList(info.fileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    dispatch(setBgImage(file.preview));
  };

  return (
    <div className='px-6 py-4 rounded-lg bg-white'>
      <div className='flex items-center gap-4'>
        <div className='text-base font-medium'>Фон чата</div>
        <Upload
          fileList={fileList}
          onChange={handleChange}
          customRequest={handleCustomRequest}
          beforeUpload={beforeUploadPNGAndJPEG}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Загрузить</Button>
        </Upload>
      </div>
      <Divider className='my-3' />
      <Swiper
        slidesPerView={4}
        grid={{
          rows: 2,
          fill: 'row',
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        modules={[Grid, Pagination, Mousewheel]}
        className='!pb-6'
      >
        {fileList.map((item) => (
          <SwiperSlide key={item.uid}>
            <LazyLoadImage
              src={item.preview}
              alt={`sticker`}
              className={`img-lazy w-20 cursor-pointer outline-offset-2 outline-green-300 `}
              effect='blur' // opacity | black-and-white
              onClick={() => handlePreview(item)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SettingsInterlocutorIGallary;
