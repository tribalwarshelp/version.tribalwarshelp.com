import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import * as ROUTES from '@config/routes';

import { TFunction } from 'i18next';

const useTabs = (t: TFunction) => {
  const loc = useLocation();
  const tabs = useMemo(() => {
    return [
      {
        to: ROUTES.SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE,
        label: t('pageLayout.tabs.indexPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.TRIBE_PAGE.MEMBERS_PAGE,
        label: t('pageLayout.tabs.membersPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.TRIBE_PAGE.HISTORY_PAGE,
        label: t('pageLayout.tabs.historyPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.TRIBE_PAGE.TRIBE_CHANGES_PAGE,
        label: t('pageLayout.tabs.tribeChanges'),
      },
      {
        to: ROUTES.SERVER_PAGE.TRIBE_PAGE.ENNOBLEMENTS_PAGE,
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
