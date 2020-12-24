import React, { forwardRef, RefObject } from 'react';
import {
  Link as RRDLink,
  LinkProps as RRDLinkProps,
  generatePath,
} from 'react-router-dom';
import { Link as MUILink, LinkProps as MUILinkProps } from '@material-ui/core';

export type Props = MUILinkProps &
  RRDLinkProps & {
    params?: { [paramName: string]: string | number | boolean | undefined };
  };

const CustomizedRRDLink = forwardRef(
  (
    { children, params, to, ...props }: Props,
    ref:
      | ((instance: HTMLAnchorElement | null) => void)
      | RefObject<HTMLAnchorElement>
      | null
      | undefined
  ) => (
    <RRDLink
      {...props}
      to={params && typeof to === 'string' ? generatePath(to, params) : to}
      ref={ref}
    >
      {children}
    </RRDLink>
  )
);

const Link = forwardRef(
  (
    { children, ...props }: Props,
    ref:
      | ((instance: HTMLAnchorElement | null) => void)
      | RefObject<HTMLAnchorElement>
      | null
      | undefined
  ) => {
    return (
      <MUILink {...props} ref={ref} component={CustomizedRRDLink}>
        {children}
      </MUILink>
    );
  }
);

export default Link;
