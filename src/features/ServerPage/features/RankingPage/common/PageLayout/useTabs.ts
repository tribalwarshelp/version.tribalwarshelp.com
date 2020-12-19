import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import * as ROUTES from '@config/routes';

import { TFunction } from 'i18next';

const useTabs = (t: TFunction) => {
  const loc = useLocation();
  const tabs = useMemo(() => {
    return [
      {
        to: ROUTES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.INDEX_PAGE,
        label: t('pageLayout.tabs.playerPage.indexPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.OD_PAGE,
        label: t('pageLayout.tabs.playerPage.odPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.DAILY_PAGE,
        label: t('pageLayout.tabs.playerPage.dailyPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.ARCHIVE_PAGE,
        label: t('pageLayout.tabs.playerPage.archivePage'),
      },
      {
        to: ROUTES.SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.INDEX_PAGE,
        label: t('pageLayout.tabs.tribePage.indexPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.OD_PAGE,
        label: t('pageLayout.tabs.tribePage.odPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.DAILY_PAGE,
        label: t('pageLayout.tabs.tribePage.dailyPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.ARCHIVE_PAGE,
        label: t('pageLayout.tabs.tribePage.archivePage'),
      },
    ];
  }, [t]);
  const currentTab = useMemo(
    () =>
      tabs.findIndex(({ to }) => {
        return matchPath(loc.pathname, { exact: true, path: to });
      }),
    [loc.pathname, tabs]
  );
  return {
    tabs,
    currentTab,
  };
};

export default useTabs;
