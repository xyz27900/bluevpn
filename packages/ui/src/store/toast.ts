import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';

export type Toast = {
  type: 'success' | 'error',
  message: string;
}

type ToastState = {
  current: Toast | null;
  queue: Toast[];
}

const initialState: ToastState = {
  current: null,
  queue: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      if (!state.current) {
        state.current = action.payload;
      } else {
        state.queue.unshift(action.payload);
      }
    },
    deleteToast: (state) => {
      state.current = null;
    },
    popToast: (state) => {
      state.current = state.queue.pop() ?? null;
    },
  },
});

export const getToast = (state: RootState): Toast | null => state.toast.current;
export const { addToast, deleteToast, popToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
