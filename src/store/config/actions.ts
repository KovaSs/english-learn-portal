import ConfigActionTypes from './actionTypes';
import * as ConfigTypes from './types.d';

export const getConfigSettings = () => ({
  type: ConfigActionTypes.GET_CONFIG_SETTINGS,
});

export const setConfigSettings = (settings: ConfigTypes.Config) => ({
  type: ConfigActionTypes.SET_CONFIG_SETTINGS,
  payload: { settings },
});
