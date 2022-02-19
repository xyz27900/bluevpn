import React, { useCallback, useLayoutEffect, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

export const useResizeObserver = (
  ref: React.RefObject<HTMLElement>,
  callback?: (entry: DOMRectReadOnly) => void,
): Size => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (!Array.isArray(entries)) {
      return;
    }

    const [entry] = entries;
    const { width, height } = entry.contentRect;
    setSize({ width, height });

    callback && callback(entry.contentRect);
  }, [callback]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver(handleResize);
    observer.observe(ref.current);

    return (): void => observer.disconnect();
  }, []);

  return size;
};
