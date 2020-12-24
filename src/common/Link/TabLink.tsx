import React from 'react';

import { Tab, TabProps } from '@material-ui/core';
import Link, { Props as LinkProps } from './Link';

export interface Props extends TabProps {
  linkProps: LinkProps;
}

function TabLink({ linkProps = { to: '' }, ...props }: Props) {
  return (
    <Link {...linkProps}>
      <Tab disableTouchRipple {...props} />
    </Link>
  );
}

export default TabLink;
