import * as NAMESPACES from '@config/namespaces';
import common from './common';
import indexPage from './index-page';

const translations = {
  [NAMESPACES.SERVER_PAGE.PLAYER_PAGE.COMMON]: common,
  [NAMESPACES.SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE]: indexPage,
};

export default translations;
