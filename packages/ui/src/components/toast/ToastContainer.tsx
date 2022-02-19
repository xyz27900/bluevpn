import React, { useEffect } from 'react';
import { animated, useTransition } from 'react-spring';
import { UiText } from '@/components/ui/UiText';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import { deleteToast, getToast, popToast } from '@/store/toast';
import { classname } from '@/utils/react.utils';

export const ToastContainer: React.FC = () => {
  const toast = useAppSelector(getToast);
  const dispatch = useAppDispatch();

  const transition = useTransition(toast, {
    from: {
      transform: 'translateY(100%)',
      opacity: 0,
    },
    enter: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
    leave: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      opacity: 0,
    },
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      dispatch(deleteToast());
      dispatch(popToast());
    }, 3000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [toast]);

  return <div className="fixed z-index-2 w-full sm:w-96 bottom-0 left-1/2 sm:mb-4 transform -translate-x-1/2">
    {
      transition((style, item) => {
        return item &&
          <animated.div
            className={
              classname(
                'px-6',
                'py-4',
                'sm:rounded-lg',
                'shadow',
                item.type === 'success' && 'bg-green',
                item.type === 'error' && 'bg-red',
              )
            }
            style={style}
          >
            <UiText color="white" normal>
              { item.message }
            </UiText>
          </animated.div>;
      })
    }
  </div>;
};
