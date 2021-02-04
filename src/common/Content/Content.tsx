import React from 'react';
import clsx from 'clsx';
import { heights } from 'theme/toolbar';

import { makeStyles } from '@material-ui/core/styles';

export interface Props extends React.HTMLAttributes<HTMLOrSVGElement> {
  footer?: boolean;
  component?: keyof JSX.IntrinsicElements;
  minHeight?: boolean;
}

interface MakeStylesProps {
  footer?: boolean;
}

function Content({
  className,
  footer = false,
  component: Wrapper = 'main',
  minHeight = true,
  ...props
}: Props) {
  const classes = useStyles({ footer });
  return (
    <Wrapper
      className={clsx(
        { [classes.minHeight]: minHeight },
        classes.padding,
        className
      )}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => {
  return {
    padding: {
      padding: theme.spacing(3, 0),
    },
    minHeight: ({ footer }: MakeStylesProps) => {
      const multiplier = footer ? 2 : 1;
      return {
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
