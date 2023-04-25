import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { UploadFile } from 'antd';

import { gallary } from '../../components/SettingsInterlocutor/SettingsInterlocutorIGallary/SettingsInterlocutorIGallary.config';
import { listColorsBgAvatar, options } from '../../config';

type Ethernet = 'wifi' | 'e' | '3g' | '4g' | 'lte';
type Geo = 'outline' | 'fill' | 'blue';
type Network = 'sim' | 'avia';

interface ConfigState {
  volumeBattary: number;
  wifi: number;
  ethernet: Ethernet;
  username: string;
  time: string;
  spum: boolean;
  bgImage: string;
  geo: Geo;
  status: string;
  bgAvatarColor: string;
  avatarFile: string;
  network: Network;
  stateSim: number;
  unread: number | null;
  isUnread: boolean;
  watermark: boolean;
}

const initialState: ConfigState = {
  volumeBattary: 80,
  wifi: 3,
  ethernet: 'wifi',
  username: 'Паша Техник',
  time: '9:41',
  spum: false,
  bgImage: gallary[0],
  geo: 'fill',
  status: options[0].label,
  bgAvatarColor: listColorsBgAvatar[0],
  avatarFile: '',
  network: 'sim',
  stateSim: 4,
  isUnread: false,
  unread: 1,
  watermark: true,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setVolumeBattary: (state, action: PayloadAction<ConfigState['volumeBattary']>) => {
      state.volumeBattary = action.payload;
    },
    setWifi: (state, action: PayloadAction<ConfigState['wifi']>) => {
      state.wifi = action.payload;
    },
    setEthernet: (state, action: PayloadAction<ConfigState['ethernet']>) => {
      state.ethernet = action.payload;
    },
    setUsername: (state, action: PayloadAction<ConfigState['username']>) => {
      state.username = action.payload;
    },
    setTime: (state, action: PayloadAction<ConfigState['time']>) => {
      state.time = action.payload;
    },
    setSpum: (state, action: PayloadAction<ConfigState['spum']>) => {
      state.spum = action.payload;
    },
    setBgImage: (state, action: PayloadAction<ConfigState['bgImage']>) => {
      state.bgImage = action.payload;
    },
    setGeo: (state, action: PayloadAction<ConfigState['geo']>) => {
      state.geo = action.payload;
    },
    setStatus: (state, action: PayloadAction<ConfigState['status']>) => {
      state.status = action.payload;
    },
    setBgAvatarColor: (state, action: PayloadAction<ConfigState['bgAvatarColor']>) => {
      state.bgAvatarColor = action.payload;
    },
    setAvatarFile: (state, action: PayloadAction<ConfigState['avatarFile']>) => {
      state.avatarFile = action.payload;
    },
    setNetwork: (state, action: PayloadAction<ConfigState['network']>) => {
      state.network = action.payload;
    },
    setStateSim: (state, action: PayloadAction<ConfigState['stateSim']>) => {
      state.stateSim = action.payload;
    },
    setUnread: (state, action: PayloadAction<ConfigState['unread']>) => {
      state.unread = action.payload;
    },
    setIsUnread: (state, action: PayloadAction<ConfigState['isUnread']>) => {
      state.isUnread = action.payload;
    },
    setWatermark: (state, action: PayloadAction<ConfigState['watermark']>) => {
      state.watermark = action.payload;
    },
  },
});

export const {
  setVolumeBattary,
  setWifi,
  setEthernet,
  setUsername,
  setTime,
  setSpum,
  setBgImage,
  setGeo,
  setStatus,
  setBgAvatarColor,
  setAvatarFile,
  setNetwork,
  setStateSim,
  setUnread,
  setIsUnread,
  setWatermark,
} = configSlice.actions;

export default configSlice.reducer;
