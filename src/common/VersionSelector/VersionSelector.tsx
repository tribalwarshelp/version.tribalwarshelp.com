import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { LANG_VERSIONS } from './queries';
import { LangVersionList } from './types';
import extractLangTagFromHostname from '@utils/extractLangTagFromHostname';

import useStyles from './styles';
import { Button, Menu, MenuItem, Link } from '@material-ui/core';
import { Language as LanguageIcon } from '@material-ui/icons';

function VersionSelector() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const langTag = extractLangTagFromHostname(window.location.hostname);
  const classes = useStyles();
  const { data, loading } = useQuery<LangVersionList>(LANG_VERSIONS, {
    fetchPolicy: 'cache-first',
    variables: {
      filter: {
        sort: 'tag ASC',
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
      <Button
        startIcon={<LanguageIcon />}
        onClick={loading ? undefined : handleClick}
      >
        {langTag}
      </Button>
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
              className={classes.menuItem}
              underline="none"
              key={lv.tag}
            >
              {lv.tag}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default VersionSelector;
