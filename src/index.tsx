import React from 'react';
import ReactDOM from 'react-dom';

import 'config/babel';
import App from './App';

declare const __ADMIN_CSS__: string;

if (typeof document !== 'undefined') {
  const rootElem: HTMLElement | null = document.getElementById('root');

  if (!rootElem) {
    throw new Error('Not found dom element id: root');
  }

  /**
   * Функционал подключения стилей staging admin кабинета
   */
  if (__DEV__) {
    const head = document.head,
      link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = __ADMIN_CSS__;
    head.appendChild(link);
  }

  ReactDOM.render(<App />, rootElem);
}
