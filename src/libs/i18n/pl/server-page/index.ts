import * as NAMESPACES from '@config/namespaces';
import common from './common';
import indexPage from './index-page';
import playerPage from './player-page';
import tribePage from './tribe-page';
import villagePage from './village-page';

const translations = {
  [NAMESPACES.SERVER_PAGE.COMMON]: common,
  [NAMESPACES.SERVER_PAGE.INDEX_PAGE]: indexPage,
  [NAMESPACES.SERVER_PAGE.VILLAGE_PAGE.INDEX_PAGE]: villagePage,
  ...playerPage,
  ...tribePage,
};

export default translations;
