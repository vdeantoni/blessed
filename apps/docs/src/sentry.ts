import * as Sentry from '@sentry/react';

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN || 'https://d9f2e9f9a0e25751d68dbfb43f09b0c8@o428318.ingest.us.sentry.io/4510240311672832',
    environment: process.env.NODE_ENV || 'development',
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 0.1, // Capture 10% of transactions for performance monitoring
    // Session Replay
    replaysSessionSampleRate: 0.1, // Sample 10% of sessions for replay
    replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions when an error occurs
    // Additional options
    beforeSend(event) {
      // Don't send events from localhost
      if (window.location.hostname === 'localhost') {
        return null;
      }
      return event;
    },
  });
}