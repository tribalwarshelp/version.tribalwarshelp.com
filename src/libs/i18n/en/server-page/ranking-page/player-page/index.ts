import * as NAMESPACES from '@config/namespaces';
import indexPage from './index-page';
import odPage from './od-page';

const translations = {
  [NAMESPACES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.INDEX_PAGE]: indexPage,
  [NAMESPACES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.OD_PAGE]: odPage,
};

export default translations;
