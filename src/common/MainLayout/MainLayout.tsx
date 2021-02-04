import React, { Fragment } from 'react';

import { Toolbar } from '@material-ui/core';
import Content from 'common/Content/Content';
import Header, { Props as HeaderProps } from './components/Header/Header';
import Footer from './components/Footer/Footer';

export interface Props {
  children?: React.ReactNode;
  headerProps?: HeaderProps;
}

function MainLayout({ children, headerProps }: Props) {
  return (
    <Fragment>
      <Header {...(headerProps ?? {})} />
      <Toolbar />
      <Content footer>{children}</Content>
      <Footer />
    </Fragment>
  );
}

export default MainLayout;
