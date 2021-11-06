import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const initSentry = () => {
  if (process.env.REACT_APP_ENABLE_SENTRY !== 'true') {
    return;
  }

  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.3,
    release: process.env.REACT_APP_VERSION,
  });
};

export default initSentry;
