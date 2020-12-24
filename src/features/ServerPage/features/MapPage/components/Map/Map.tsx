import React, { memo, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import Spinner from '@common/Spinner/Spinner';

export interface Props {
  src: string;
  alt: string;
  maxWidth?: number;
  loadingInfo?: string;
}

function Map({
  src = '',
  alt = 'Map',
  maxWidth = 1000,
  loadingInfo = 'It may take a while to generate a map!',
}: Props) {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
  }, [src]);

  return (
    <div className={classes.container}>
      {loading && (
        <Alert variant="filled" severity="warning">
          {loadingInfo}
        </Alert>
      )}
      <div
        className={classes.imageWrapper}
        style={{ maxWidth: `${maxWidth}px` }}
      >
        {loading && (
          <Spinner
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
      marginTop: theme.spacing(2),
      margin: 'auto',
    },
  };
});

export default memo(Map);
