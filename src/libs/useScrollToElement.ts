import { DependencyList, useRef } from 'react';
import useUpdateEffect from './useUpdateEffect';

export interface Options extends ScrollIntoViewOptions {
  skip?: boolean;
}

const useScrollToElement = (
  element: HTMLElement,
  deps: DependencyList,
  opts: Options = { behavior: 'auto', block: 'start', skip: false }
) => {
  const skip = useRef(opts.skip);

  useUpdateEffect(() => {
    skip.current = opts.skip;
  }, [opts.skip]);

  useUpdateEffect(() => {
    if (!skip.current) {
      element.scrollIntoView(opts);
    }
  }, deps);
};

export default useScrollToElement;
