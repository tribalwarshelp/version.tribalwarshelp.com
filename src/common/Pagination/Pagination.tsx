import React from 'react';

import {
  Pagination as MaterialUIPagination,
  PaginationProps,
} from '@material-ui/lab';

export type Props = PaginationProps & {
  total?: number;
  perPage?: number;
};

function Pagination({ total, perPage, ...rest }: Props) {
  if (total && perPage) {
    rest.count = total > 0 ? Math.ceil(total / perPage) : 1;
  }
  return <MaterialUIPagination {...rest} />;
}

export default Pagination;
