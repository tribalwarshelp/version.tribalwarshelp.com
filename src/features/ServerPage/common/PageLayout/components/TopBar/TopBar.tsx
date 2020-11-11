import React from 'react';
import clsx from 'clsx';
import { TFunction } from 'i18next';

import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export interface Props {
  className?: string;
  t: TFunction;
  openSidebar?: () => void;
}

const TopBar = ({ className, openSidebar }: Props) => {
  return (
    <AppBar className={clsx(className)}>
      <Toolbar>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={openSidebar}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
