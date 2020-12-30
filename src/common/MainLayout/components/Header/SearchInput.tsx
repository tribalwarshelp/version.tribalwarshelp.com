import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as ROUTES from '@config/routes';
import * as NAMESPACES from '@config/namespaces';

import { InputAdornment, IconButton, TextFieldProps } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import SearchInput from '@common/Form/SearchInput';
import Link from '@common/Link/Link';

export type Props = TextFieldProps & {
  defaultQ?: string;
};

function HeaderSearchInput({ defaultQ = '', ...rest }: Props) {
  const { t } = useTranslation(NAMESPACES.COMMON);
  const [q, setQ] = useState<string>(defaultQ);
  const trimmedQLength = q.trim().length;
  const iconButton = (
    <IconButton size="small" type="submit" disabled={trimmedQLength === 0}>
      <SearchIcon />
    </IconButton>
  );

  return (
    <SearchInput
      fullWidth
      variant="outlined"
      placeholder={t<string>('mainLayout.header.search')}
      size="small"
      {...rest}
      value={q}
      onChange={e => {
        setQ(e.target.value);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {trimmedQLength ? (
              <Link to={ROUTES.SEARCH_PAGE + `?q=${encodeURIComponent(q)}`}>
                {iconButton}
              </Link>
            ) : (
              iconButton
            )}
          </InputAdornment>
        ),
      }}
      onResetValue={() => setQ('')}
    />
  );
}

export default HeaderSearchInput;
