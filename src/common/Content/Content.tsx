import React from 'react';
import clsx from 'clsx';
import { heights } from '@theme/toolbar';

import { makeStyles } from '@material-ui/core/styles';

export interface Props extends React.HTMLProps<HTMLElement> {
  footer?: boolean;
}

interface MakeStylesProps {
  footer?: boolean;
}

function Content({ className, footer = false, ...props }: Props) {
  const classes = useStyles({ footer });
  return <main className={clsx(classes.main, className)} {...props} />;
}

const useStyles = makeStyles(theme => {
  return {
    main: ({ footer }: MakeStylesProps) => {
      const multiplier = footer ? 2 : 1;
      return {
        padding: theme.spacing(3, 0),
        minHeight: `calc(100vh - ${heights.tabletDesktop * multiplier}px)`,
        [`${theme.breakpoints.down('xs')} and (orientation: landscape)`]: {
          minHeight: `calc(100vh - ${heights.mobileLandscape * multiplier}px)`,
        },
        [theme.breakpoints.down('xs')]: {
          minHeight: `calc(100vh - ${heights.mobilePortrait * multiplier}px)`,
        },
      };
    },
  };
});

export default Content;
