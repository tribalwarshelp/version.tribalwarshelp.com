import { useEffect } from 'react';
import { NAME } from '@config/app';

export interface UseTitleOptions {
  skip?: boolean;
}

const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
  skip: false,
};

function useTitle(
  title: string,
  options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS
) {
  useEffect(() => {
    if (options.skip) return;
    document.title = `${title} | ${NAME}`;
    return () => {
      document.title = NAME;
    };
  }, [title, options]);
}

export default typeof document !== 'undefined'
  ? useTitle
  : (_title: string) => _title;
