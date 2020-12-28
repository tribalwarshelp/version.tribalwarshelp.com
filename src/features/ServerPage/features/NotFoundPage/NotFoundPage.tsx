import React from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '@libs/useTitle';
import { NOT_FOUND_PAGE } from '@config/namespaces';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PageLayout from '@features/ServerPage/common/PageLayout/PageLayout';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3, 0),
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
  wrapIntoServerPageLayout?: boolean;
}

function NotFoundPage({
  title,
  description,
  wrapIntoServerPageLayout = true,
}: Props) {
  const classes = useStyles();
  const { t } = useTranslation(NOT_FOUND_PAGE);
  useTitle(t('title'));

  const jsx = (
    <div className={classes.container}>
      <div>
        <Typography variant="h1">{title ? title : t('title')}</Typography>
        {description && <Typography variant="h4">{description}</Typography>}
      </div>
    </div>
  );

  if (!wrapIntoServerPageLayout) {
    return jsx;
  }

  return (
    <PageLayout noPadding>
      <div className={classes.container}>
        <div>
          <Typography variant="h1">{title ? title : t('title')}</Typography>
          {description && <Typography variant="h4">{description}</Typography>}
        </div>
      </div>
    </PageLayout>
  );
}

export default NotFoundPage;
