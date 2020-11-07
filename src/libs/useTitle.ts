import { useRef, useEffect } from 'react';
import { NAME } from '@config/app';

export interface UseTitleOptions {
  restoreOnUnmount?: boolean;
}

const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
  restoreOnUnmount: false,
};

function useTitle(
  title: string,
  options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS
) {
  const prevTitle = useRef(document.title);
  useEffect(() => {
    document.title = `${title} | ${NAME}`;
    if (options && options.restoreOnUnmount) {
      return () => {
        document.title = prevTitle.current;
      };
    }
    return () => {
      document.title = NAME;
    };
  }, [title, options]);
}

export default typeof document !== 'undefined'
  ? useTitle
  : (_title: string) => {};
