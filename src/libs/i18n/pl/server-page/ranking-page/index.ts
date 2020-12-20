import * as NAMESPACES from '@config/namespaces';
import common from './common';
import playerPage from './player-page';

const translations = {
  [NAMESPACES.SERVER_PAGE.RANKING_PAGE.COMMON]: common,
  ...playerPage,
};

export default translations;
