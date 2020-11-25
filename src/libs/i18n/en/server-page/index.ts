import * as NAMESPACES from '@config/namespaces';
import common from './common';
import indexPage from './index-page';
import playerPage from './player-page';

const translations = {
  [NAMESPACES.SERVER_PAGE.COMMON]: common,
  [NAMESPACES.SERVER_PAGE.INDEX_PAGE]: indexPage,
  ...playerPage,
};

export default translations;
