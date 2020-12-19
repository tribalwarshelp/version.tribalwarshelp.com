import React from 'react';
import { useTranslation } from 'react-i18next';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import useTabs from './useTabs';
import * as NAMESPACES from '@config/namespaces';

import { makeStyles } from '@material-ui/core/styles';

import { Tabs, Tab } from '@material-ui/core';
import Link from '@common/Link/Link';
import ServerPageLayout from '@features/ServerPage/common/PageLayout/PageLayout';

import background from './backgrounds/bg-1-dark.png';

export interface Props {
  children: React.ReactNode;
}

function PageLayout({ children }: Props) {
  const classes = useStyles();
  const server = useServer();
  const { t } = useTranslation(NAMESPACES.SERVER_PAGE.RANKING_PAGE.COMMON);
  const { currentTab, tabs } = useTabs(t);
  return (
    <ServerPageLayout noPadding>
      <header className={classes.header}>
        <Tabs
          variant="scrollable"
          value={currentTab}
          selectionFollowsFocus={false}
        >
          {tabs.map(({ to, label }) => {
            return (
              <Tab
                key={to}
                label={
                  <Link
                    to={to}
                    color="inherit"
                    params={{ key: server.key }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    {label}
                  </Link>
                }
              />
            );
          })}
        </Tabs>
      </header>
      <div className={classes.content}>{children}</div>
    </ServerPageLayout>
  );
}

const useStyles = makeStyles(theme => ({
  header: {
    width: '100%',
    minHeight: theme.spacing(30),
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    backgroundImage: `url(${background})`,
    boxShadow: theme.shadows[4],
  },
  content: {
    height: '100%',
    padding: theme.spacing(3, 0),
    '&.no-padding': {
      padding: '0 0',
    },
  },
}));

export default PageLayout;
