import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import * as ROUTES from '@config/routes';

import { TFunction } from 'i18next';

const useTabs = (t: TFunction) => {
  const loc = useLocation();
  const tabs = useMemo(() => {
    return [
      {
        to: ROUTES.SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE,
        label: t('pageLayout.tabs.indexPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.PLAYER_PAGE.HISTORY_PAGE,
        label: t('pageLayout.tabs.historyPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.PLAYER_PAGE.TRIBE_CHANGES_PAGE,
        label: t('pageLayout.tabs.tribeChanges'),
      },
      {
        to: ROUTES.SERVER_PAGE.PLAYER_PAGE.ENNOBLEMENTS_PAGE,
        label: t('pageLayout.tabs.ennoblementsPage'),
      },
    ];
  }, [t]);
  const currentTab = useMemo(() => {
    const currentTab = tabs.findIndex(({ to }) => {
      return matchPath(loc.pathname, { exact: true, path: to });
    });
    return currentTab === -1
      ? process.env.NODE_ENV === 'production'
        ? -1
        : 0
      : currentTab;
  }, [loc.pathname, tabs]);
  return {
    tabs,
    currentTab,
  };
};

export default useTabs;
