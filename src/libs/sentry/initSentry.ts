import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const initSentry = () => {
  if (process.env.REACT_APP_SENTRY_ENABLED !== 'true') {
    return;
  }

  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.3,
    release:
      'twhelp-version-website@' +
      (process.env.REACT_APP_VERSION ?? 'development'),
    environment: process.env.NODE_ENV ?? 'development',
  });
};

export default initSentry;
