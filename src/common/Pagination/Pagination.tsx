import React from 'react';
import { useTranslation } from 'react-i18next';
import { COMMON } from '@config/namespaces';

import {
  Pagination as MaterialUIPagination,
  PaginationProps,
} from '@material-ui/lab';

export type Props = PaginationProps & {
  total?: number;
  perPage?: number;
};

function Pagination({ total, perPage, ...rest }: Props) {
  const { t } = useTranslation(COMMON);

  const getItemAriaLabel = (
    type: 'page' | 'first' | 'last' | 'next' | 'previous',
    page: number
  ): string => {
    switch (type) {
      case 'page':
        return `${t<string>('pagination.page')} ${page}`;
      case 'first':
        return t<string>('pagination.first');
      case 'last':
        return t<string>('pagination.last');
      case 'next':
        return t<string>('pagination.next');
      case 'previous':
        return t<string>('pagination.previous');
    }
    return '';
  };

  if (total && perPage) {
    rest.count = total > 0 ? Math.ceil(total / perPage) : 1;
  }
  return <MaterialUIPagination {...rest} getItemAriaLabel={getItemAriaLabel} />;
}

export default Pagination;
