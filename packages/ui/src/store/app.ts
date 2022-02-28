import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '@xyz27900/bluevpn-common/dist/es/models/user.model';
import { RootState } from '@/store/index';

type AppState = {
  user: UserModel | null;
}

const initialState: AppState = {
  user: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserModel | null>) => {
      state.user = action.payload;
    },
  },
});

export const getUser = (state: RootState): UserModel | null => state.app.user;
export const { setUser } = appSlice.actions;
export const appReducer = appSlice.reducer;
