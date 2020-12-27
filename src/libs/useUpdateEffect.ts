import { useEffect } from 'react';
import useFirstMountState from './useFirstMountState';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    } // eslint-disable-next-line
  }, deps);
};

export default useUpdateEffect;
