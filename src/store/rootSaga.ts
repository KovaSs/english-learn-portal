import { take, call, spawn, getContext } from 'redux-saga/effects';

import { errorSentry } from 'config/sentry';
import ConfigActionTypes from 'store/config/actionTypes';

const moduleName = 'rootSaga';

/** Сохранение настроек из config.json в saga-context */
function* initConfig() {
  try {
    const { payload } = yield take(ConfigActionTypes.SET_CONFIG_SETTINGS);
    const api = yield getContext('qartilegramApi');
    yield api.setApi(payload.settings.api);
  } catch (error) {
    yield call(errorSentry, { moduleName, error, saga: 'initConfig' });
  }
}

export default function* rootSaga() {
  yield spawn(initConfig);
}
