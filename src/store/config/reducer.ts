import ConfigActionTypes from './actionTypes';
import { Config } from './types.d';

const ConfigReducer = (state: Config = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case ConfigActionTypes.SET_CONFIG_SETTINGS:
      return payload.settings;

    default:
      return state;
  }
};

export default ConfigReducer;
