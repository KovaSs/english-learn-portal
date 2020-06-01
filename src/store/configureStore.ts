import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { QuartilegramApi } from 'api';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION__(): any;
  }
}

export const history = createBrowserHistory();

export default function configureStore(state = {}) {
  const sagaMiddleware = createSagaMiddleware({
    context: { qartilegramApi: QuartilegramApi },
  });
  const args = [applyMiddleware(sagaMiddleware)];

  if (__REDUX_DEV_TOOLS_ENABLED__) {
    if (
      typeof window === 'object' &&
      window &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function'
    ) {
      args.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    } else {
      // eslint-disable-next-line no-console
      console.warn('extension not included redux devtools or are not in the browser environment');
    }
  }

  const store = createStore(rootReducer, state, compose(...args));

  sagaMiddleware.run(rootSaga);

  return store;
}
