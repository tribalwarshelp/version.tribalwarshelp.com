import * as NAMESPACES from 'config/namespaces';
import common from './common';
import playerPage from './player-page';
import tribePage from './tribe-page';

const translations = {
  [NAMESPACES.SERVER_PAGE.RANKING_PAGE.COMMON]: common,
  ...playerPage,
  ...tribePage,
};

export default translations;
