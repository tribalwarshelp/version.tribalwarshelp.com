import React from 'react';
import { useTranslation } from 'react-i18next';
import useGlobalSearch from './useGlobalSearch';
import * as NAMESPACES from '@config/namespaces';

import { InputAdornment, IconButton, TextFieldProps } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import SearchInput from '@common/Form/SearchInput';
import Link from '@common/Link/Link';

function CustomizedSearchInput(props: TextFieldProps) {
  const { t } = useTranslation(NAMESPACES.COMMON);
  const { q, setQ, href } = useGlobalSearch();
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
      placeholder={t<string>('globalSearch.searchInput.placeholder')}
      size="small"
      {...props}
      value={q}
      onChange={e => {
        setQ(e.target.value);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {trimmedQLength ? <Link to={href}>{iconButton}</Link> : iconButton}
          </InputAdornment>
        ),
      }}
      onResetValue={() => setQ('')}
    />
  );
}

export default CustomizedSearchInput;
