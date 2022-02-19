import { useAppDispatch } from '@/hooks/redux.hooks';
import { addToast } from '@/store/toast';

type ToastFn = (message: string) => void;

interface ToastHook {
  success: ToastFn;
  error: ToastFn;
}

export const useToast = (): ToastHook => {
  const dispatch = useAppDispatch();

  const success: ToastFn = message => {
    dispatch(addToast({
      type: 'success',
      message,
    }));
  };

  const error: ToastFn = message => {
    dispatch(addToast({
      type: 'error',
      message,
    }));
  };

  return { success, error };
};
