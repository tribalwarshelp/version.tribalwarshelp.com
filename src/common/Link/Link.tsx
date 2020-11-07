import React, { forwardRef, RefObject } from 'react';
import { Link as RRDLink, LinkProps as RRDLinkProps } from 'react-router-dom';
import { Link as MUILink, LinkProps as MUILinkProps } from '@material-ui/core';

export type Props = MUILinkProps & RRDLinkProps;

const CustomizedRRDLink = forwardRef(
  (
    { children, ...props }: Props,
    ref:
      | ((instance: HTMLAnchorElement | null) => void)
      | RefObject<HTMLAnchorElement>
      | null
      | undefined
  ) => (
    <RRDLink {...props} ref={ref}>
      {children}
    </RRDLink>
  )
);

function Link({ children, ...props }: Props) {
  return (
    <MUILink {...props} component={CustomizedRRDLink}>
      {children}
    </MUILink>
  );
}

export default Link;
