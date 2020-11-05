import React from 'react';
import { Link as RRDLink, LinkProps as RRDLinkProps } from 'react-router-dom';
import { Link as MUILink, LinkProps as MUILinkProps } from '@material-ui/core';

export type Props = MUILinkProps & RRDLinkProps;

const CustomizedRRDLink = ({ children, ...props }: Props) => {
  return <RRDLink {...props}>{children}</RRDLink>;
};

function Link({ children, ...props }: Props) {
  return (
    <MUILink {...props} component={CustomizedRRDLink}>
      {children}
    </MUILink>
  );
}

export default Link;
