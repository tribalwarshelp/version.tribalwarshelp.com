import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { COMMON } from '@config/namespaces';
import { LANG_VERSIONS } from './queries';
import { LangVersionList } from './types';
import extractLangTagFromHostname from '@utils/extractLangTagFromHostname';

import { Button, Menu, MenuItem, Link, Tooltip } from '@material-ui/core';
import { Language as LanguageIcon } from '@material-ui/icons';

function VersionSelector() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation(COMMON);
  const langTag = extractLangTagFromHostname(window.location.hostname);
  const { data, loading } = useQuery<LangVersionList>(LANG_VERSIONS, {
    fetchPolicy: 'cache-first',
    variables: {
      filter: {
        sort: 'tag ASC',
        tagNEQ: [langTag],
      },
    },
  });
  const langVersions = data?.langVersions?.items ?? [];

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
      langTag,
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
          {langTag}
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {langVersions.map(lv => {
          return (
            <MenuItem
              component={Link}
              href={buildLink(lv.tag)}
              underline="none"
              key={lv.tag}
              title={lv.host}
            >
              {lv.host}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default VersionSelector;
