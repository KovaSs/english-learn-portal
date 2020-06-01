/* eslint-disable no-undef */
import * as Sentry from '@sentry/browser';

interface ConfigSentry {
  dsn: string;
  enable: boolean;
}

/** Инициализация sentry */
export default function initSentry(sentry?: ConfigSentry) {
  if (sentry?.dsn && sentry?.enable) return Sentry.init({ dsn: sentry.dsn });
}

/** Логирование кастомных ошибок в sentry */
export function errorSentry(settings) {
  Sentry.withScope((scope) => {
    scope.setTag('saga', settings.moduleName);
    Sentry.captureMessage(`${settings.saga} - saga`);
    Sentry.captureException(settings.error);
  });
}
