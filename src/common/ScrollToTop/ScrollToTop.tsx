import { useLocation } from 'react-router-dom';
import useScrollToElement from '@libs/useScrollToElement';

function ScrollToTop() {
  const { pathname } = useLocation();

  useScrollToElement(document.documentElement, [pathname], {
    behavior: 'auto',
  });

  return null;
}

export default ScrollToTop;
