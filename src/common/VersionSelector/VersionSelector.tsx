import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { COMMON } from '@config/namespaces';
import { VERSIONS } from './queries';
import extractVersionCodeFromHostname from '@utils/extractVersionCodeFromHostname';
import { VersionsQueryVariables } from '@libs/graphql/types';
import { VersionList } from './types';

import { Button, Menu, MenuItem, Link, Tooltip } from '@material-ui/core';
import { Language as LanguageIcon } from '@material-ui/icons';

function VersionSelector() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation(COMMON);
  const versionCode = extractVersionCodeFromHostname(window.location.hostname);
  const { data, loading } = useQuery<VersionList, VersionsQueryVariables>(
    VERSIONS,
    {
      fetchPolicy: 'cache-first',
      variables: {
        filter: {
          sort: 'code ASC',
          codeNEQ: [versionCode],
        },
      },
    }
  );
  const versions = data?.versions?.items ?? [];

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buildLink = (tag: string) => {
    return `${window.location.protocol}//${window.location.host.replace(
      versionCode,
      tag
    )}`;
  };

  return (
    <div>
      <Tooltip
        title={t<string>('versionSelector.changeVersion')}
        placement="bottom"
      >
        <Button
          startIcon={<LanguageIcon />}
          onClick={loading ? undefined : handleClick}
        >
          {versionCode}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {versions.map(v => {
          return (
            <MenuItem
              component={Link}
              href={buildLink(v.code)}
              underline="none"
              key={v.code}
              title={v.host}
            >
              {v.host}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default VersionSelector;
