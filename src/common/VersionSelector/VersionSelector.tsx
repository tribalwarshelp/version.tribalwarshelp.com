import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useVersion from '@libs/VersionContext/useVersion';
import useVersions from './useVersions';
import { COMMON } from '@config/namespaces';

import { Button, Menu, MenuItem, Link, Tooltip } from '@material-ui/core';
import { Language as LanguageIcon } from '@material-ui/icons';

function VersionSelector() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation(COMMON);
  const version = useVersion();
  const { versions, loading } = useVersions(version.code);

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
      version.code,
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
          {version.code}
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
              color="inherit"
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
