import { useEffect, useState } from 'react';

type WindowSize = {
  width?: number;
  height?: number;
};

export const DEFAULT_SCREEN = {
  MOBILE: 'xs',
  TABLET: 'sm',
  PC: 'md',
};

const BREAK_POINTS = {
  0: DEFAULT_SCREEN.MOBILE,
  600: DEFAULT_SCREEN.TABLET,
  960: DEFAULT_SCREEN.PC,
};

const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState<string>('');
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    if (windowSize.width) {
      if (0 < windowSize.width && windowSize.width < 600) {
        setBreakPoint(BREAK_POINTS[0]);
      }
      if (600 < windowSize.width && windowSize.width < 960) {
        setBreakPoint(BREAK_POINTS[600]);
      }
      if (960 < windowSize.width && windowSize.width < 1280) {
        setBreakPoint(BREAK_POINTS[960]);
      }
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);

  return breakpoint;
};

export default useBreakpoint;
