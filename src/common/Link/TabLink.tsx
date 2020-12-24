import React from 'react';

import { Tab, TabProps } from '@material-ui/core';
import Link, { Props as LinkProps } from './Link';

export interface Props extends TabProps {
  linkProps: LinkProps;
}

function TabLink({ linkProps = { to: '' }, style = {}, ...props }: Props) {
  return (
    <Link {...linkProps}>
      <Tab
        disableTouchRipple
        style={{ width: '100%', height: '100%', ...style }}
        {...props}
      />
    </Link>
  );
}

export default TabLink;
