import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n';

import { routes } from 'api';
import configureStore, { history } from 'store/configureStore';
import { ConfigTypes } from 'store/config';

const store = configureStore();

interface Props {
  config: ConfigTypes.Config;
}

function AppContainer({ config }: Props) {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={[routes.urlPageNew, routes.urlPageView, routes.urlPageEdit]}>
            </Route>
          </Switch>
        </Router>
      </Provider>
    </I18nextProvider>
  );
}

export default AppContainer;
