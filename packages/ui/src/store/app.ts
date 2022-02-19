import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccessOptionModel } from '@xyz27900/bluevpn-common/dist/es/models/access-option.model';
import { UserModel } from '@xyz27900/bluevpn-common/dist/es/models/user.model';
import { RootState } from '@/store/index';

type AppState = {
  user: UserModel | null;
  wallet: string | null;
  accessOptions: AccessOptionModel[];
  isReady: boolean;
}

const initialState: AppState = {
  user: null,
  wallet: null,
  accessOptions: [],
  isReady: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserModel | null>) => {
      state.user = action.payload;
    },
    setWallet: (state, action: PayloadAction<string | null>) => {
      state.wallet = action.payload;
    },
    setAccessOptions: (state, action: PayloadAction<AccessOptionModel[]>) => {
      state.accessOptions = action.payload;
    },
    setIsReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
  },
});

export const getUser = (state: RootState): UserModel | null => state.app.user;
export const getWallet = (state: RootState): string | null => state.app.wallet;
export const getAccessOptions = (state: RootState): AccessOptionModel[] => state.app.accessOptions;
export const getIsReady = (state: RootState): boolean => state.app.isReady;
export const { setUser, setWallet, setAccessOptions, setIsReady } = appSlice.actions;
export const appReducer = appSlice.reducer;
