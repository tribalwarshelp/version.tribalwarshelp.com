import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useVersions from './useVersions';
import { COMMON } from '@config/namespaces';
import extractVersionCodeFromHostname from '@utils/extractVersionCodeFromHostname';

import { Button, Menu, MenuItem, Link, Tooltip } from '@material-ui/core';
import { Language as LanguageIcon } from '@material-ui/icons';

function VersionSelector() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation(COMMON);
  const versionCode = extractVersionCodeFromHostname(window.location.hostname);
  const { versions, loading } = useVersions(versionCode);

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
