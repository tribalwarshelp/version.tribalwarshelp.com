import * as NAMESPACES from '@config/namespaces';
import common from './common';
import indexPage from './index-page';
import playerPage from './player-page';
import tribePage from './tribe-page';
import villagePage from './village-page';
import rankingPage from './ranking-page';
import warStatsPage from './war-stats-page';
import mapPage from './map-page';
import ennoblementsPage from './ennoblements-page';

const translations = {
  [NAMESPACES.SERVER_PAGE.COMMON]: common,
  [NAMESPACES.SERVER_PAGE.INDEX_PAGE]: indexPage,
  [NAMESPACES.SERVER_PAGE.VILLAGE_PAGE.INDEX_PAGE]: villagePage,
  [NAMESPACES.SERVER_PAGE.MAP_PAGE]: mapPage,
  [NAMESPACES.SERVER_PAGE.WAR_STATS_PAGE]: warStatsPage,
  [NAMESPACES.SERVER_PAGE.ENNOBLEMENTS_PAGE]: ennoblementsPage,
  ...playerPage,
  ...tribePage,
  ...rankingPage,
};

export default translations;
