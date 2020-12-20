import * as NAMESPACES from '@config/namespaces';
import indexPage from './index-page';
import odPage from './od-page';
import dailyPage from './daily-page';

const translations = {
  [NAMESPACES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.INDEX_PAGE]: indexPage,
  [NAMESPACES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.OD_PAGE]: odPage,
  [NAMESPACES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.DAILY_PAGE]: dailyPage,
};

export default translations;
