import React, { memo, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Spinner from '@common/Spinner/Spinner';

export interface Props {
  src: string;
  alt: string;
  maxWidth?: number;
}

function Map({ src = '', alt = 'Map', maxWidth = 1000 }: Props) {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
  }, [src]);

  return (
    <div className={classes.container}>
      {loading ? (
        <Alert severity="warning">It may take a while to generate a map!</Alert>
      ) : (
        <Alert severity="info">
          URL:{' '}
          <Link className={classes.link} href={src}>
            {src}
          </Link>
        </Alert>
      )}
      <div
        className={classes.imageWrapper}
        style={{ maxWidth: `${maxWidth}px` }}
      >
        {loading && (
          <Spinner
            size={150}
            containerProps={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          />
        )}
        <img
          src={src}
          alt={alt}
          style={{
            display: loading ? 'none' : 'block',
          }}
          onLoad={() => setLoading(false)}
          className={classes.img}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => {
  return {
    img: {
      display: 'block',
      width: '100%',
      height: 'auto',
    },
    link: {
      wordBreak: 'break-all',
    },
    container: {
      marginTop: theme.spacing(2),
    },
    imageWrapper: {
      marginTop: theme.spacing(1),
      margin: 'auto',
    },
  };
});

export default memo(Map);
