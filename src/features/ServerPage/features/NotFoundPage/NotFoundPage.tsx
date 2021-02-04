import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from 'libs/useTitle';
import { NOT_FOUND_PAGE } from 'config/namespaces';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Content from 'common/Content/Content';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    minHeight: 'inherit',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    '& > div': {
      flex: 1,
    },
  },
}));

export interface Props {
  title?: string;
  description?: string;
}

function NotFoundPage({ title, description }: Props) {
  const classes = useStyles();
  const { t } = useTranslation(NOT_FOUND_PAGE);
  useTitle(t('title'));

  return (
    <Content component="div" className={classes.container}>
      <div>
        <Typography variant="h1">{title ? title : t('title')}</Typography>
        {description && <Typography variant="h4">{description}</Typography>}
      </div>
    </Content>
  );
}

export default NotFoundPage;
