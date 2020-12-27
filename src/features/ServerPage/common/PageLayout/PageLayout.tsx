import React, { useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { SERVER_PAGE } from '@config/namespaces';
import { DRAWER_WIDTH } from './components/Sidebar/contants';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Toolbar } from '@material-ui/core';

import Content, { Props as ContentProps } from '@common/Content/Content';
import Sidebar from './components/Sidebar/Sidebar';
import TopBar from './components/TopBar/TopBar';

export interface Props {
  children?: React.ReactNode;
  noPadding?: boolean;
  contentClassName?: string;
  contentStyle?: ContentProps['style'];
}

function PageLayout({
  children,
  noPadding,
  contentClassName,
  contentStyle,
}: Props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });
  const { t } = useTranslation(SERVER_PAGE.COMMON);
  const shouldOpenSidebar = isDesktop ? true : open;

  const openSidebar = () => {
    setOpen(true);
  };

  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <div
      className={clsx({
        [classes.shiftContent]: isDesktop,
      })}
    >
      <TopBar openSidebar={open ? closeSidebar : openSidebar} t={t} />
      <Toolbar />
      <Sidebar
        onClose={closeSidebar}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
        t={t}
        onOpen={openSidebar}
      />
      <Content
        className={clsx(classes.content, contentClassName, {
          'no-padding': noPadding,
        })}
        style={contentStyle}
      >
        {children}
      </Content>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: DRAWER_WIDTH,
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
