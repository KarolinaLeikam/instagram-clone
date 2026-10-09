import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://aac9733e3f510911bf122ac4a4b891c3@o4512221293641728.ingest.de.sentry.io/4512221304258640',
  environment: import.meta.env.MODE, // development / production
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost'],
  // Session Replay: записываем только сессии с ошибками
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
});
