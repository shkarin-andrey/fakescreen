import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { FormattedMessage } from 'react-intl';

import { gallary } from '../../components/SettingsInterlocutor/SettingsInterlocutorIGallary/SettingsInterlocutorIGallary.config';
import { listColorsBgAvatar, options } from '../../config';

type Ethernet = 'wifi' | 'e' | '3g' | '4g' | 'lte';
type Geo = 'outline' | 'fill' | 'blue' | undefined;
type Network = 'sim' | 'avia';

interface ConfigState {
  volumeBattary: number;
  wifi: number;
  isEconom: boolean;
  isCharge: boolean;
  ethernet: Ethernet;
  username: string;
  time: string;
  spum: boolean;
  mute: boolean;
  bgImage: string | undefined;
  geo: Geo;
  status: any;
  bgAvatarColor: string;
  avatarFile: string | null;
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
  time: '09:41',
  spum: false,
  mute: false,
  bgImage: gallary[25].preview,
  geo: undefined,
  status: <FormattedMessage id={options[1].label} />,
  bgAvatarColor: listColorsBgAvatar[0],
  avatarFile: null,
  network: 'sim',
  stateSim: 4,
  isUnread: false,
  unread: 1,
  watermark: true,
  isEconom: false,
  isCharge: false,
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
    setMute: (state, action: PayloadAction<ConfigState['mute']>) => {
      state.mute = action.payload;
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
    setIsEconom: (state, action: PayloadAction<ConfigState['isEconom']>) => {
      state.isEconom = action.payload;
    },
    setIsCharge: (state, action: PayloadAction<ConfigState['isCharge']>) => {
      state.isCharge = action.payload;
    },
    setGlobalConfig: (state, action: PayloadAction<ConfigState>) => {
      state.volumeBattary = action.payload.volumeBattary;
      state.wifi = action.payload.wifi;
      state.ethernet = action.payload.ethernet;
      state.username = action.payload.username;
      state.time = action.payload.time;
      state.spum = action.payload.spum;
      state.mute = action.payload.mute;
      state.bgImage = action.payload.bgImage;
      state.geo = action.payload.geo;
      // state.status = action.payload.status;
      state.bgAvatarColor = action.payload.bgAvatarColor;
      state.avatarFile = action.payload.avatarFile;
      state.network = action.payload.network;
      state.stateSim = action.payload.stateSim;
      state.isUnread = action.payload.isUnread;
      state.unread = action.payload.unread;
      state.watermark = action.payload.watermark;
      state.isEconom = action.payload.isEconom;
      state.isCharge = action.payload.isCharge;
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
  setMute,
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
  setIsCharge,
  setIsEconom,
  setGlobalConfig,
} = configSlice.actions;

export default configSlice.reducer;
