import * as NAMESPACES from 'config/namespaces';
import common from './common';
import indexPage from './index-page';
import historyPage from './history-page';
import ennoblementsPage from './ennoblements-page';
import tribeChangesPage from './tribe-changes-page';

const translations = {
  [NAMESPACES.SERVER_PAGE.PLAYER_PAGE.COMMON]: common,
  [NAMESPACES.SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE]: indexPage,
  [NAMESPACES.SERVER_PAGE.PLAYER_PAGE.HISTORY_PAGE]: historyPage,
  [NAMESPACES.SERVER_PAGE.PLAYER_PAGE.ENNOBLEMENTS_PAGE]: ennoblementsPage,
  [NAMESPACES.SERVER_PAGE.PLAYER_PAGE.TRIBE_CHANGES_PAGE]: tribeChangesPage,
};

export default translations;
