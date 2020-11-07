import * as NAMESPACES from '@config/namespaces';
import common from './common';
import indexPage from './index-page';
import notFoundPage from './not-found-page';

const translations = {
  [NAMESPACES.COMMON]: common,
  [NAMESPACES.INDEX_PAGE]: indexPage,
  [NAMESPACES.NOT_FOUND_PAGE]: notFoundPage,
};

export default translations;
