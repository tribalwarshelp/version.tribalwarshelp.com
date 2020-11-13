import * as NAMESPACES from '@config/namespaces';
import common from './common';
import indexPage from './index-page';
import notFoundPage from './not-found-page';
import serverPage from './server-page';
import table from './table';

const translations = {
  [NAMESPACES.COMMON]: common,
  [NAMESPACES.INDEX_PAGE]: indexPage,
  [NAMESPACES.NOT_FOUND_PAGE]: notFoundPage,
  [NAMESPACES.TABLE]: table,
  ...serverPage,
};

export default translations;
