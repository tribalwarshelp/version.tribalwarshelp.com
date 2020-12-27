import React, { memo, useState, useEffect } from 'react';
import { TFunction } from 'i18next';

import { makeStyles } from '@material-ui/core/styles';
import Spinner from '@common/Spinner/Spinner';
import InfoWhileGenerating from './InfoWhileGenerating';
import InfoAfterGenerating from './InfoAfterGenerating';

export interface Props {
  src: string;
  alt: string;
  maxWidth?: number;
  t: TFunction;
}

function Map({ src = '', alt = 'Map', maxWidth = 1000, t }: Props) {
  const [isGenerating, setIsGenerating] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    setIsGenerating(true);
  }, [src]);

  return (
    <div className={classes.container}>
      {isGenerating && <InfoWhileGenerating t={t} />}
      {!isGenerating && <InfoAfterGenerating t={t} />}
      <div
        className={classes.imageWrapper}
        style={{ maxWidth: `${maxWidth}px` }}
      >
        {isGenerating && (
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
            display: isGenerating ? 'none' : 'block',
          }}
          onLoad={() => setIsGenerating(false)}
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
