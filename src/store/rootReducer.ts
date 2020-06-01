import { RecordOf } from 'immutable';
import { combineReducers } from 'redux';
import { requestReducer } from '@packages/helpers-rtkit';

import { ConfigReducer, ConfigTypes } from './config';

export interface RootState {
  config: ConfigTypes.Config;
  requestReducer: {
    loading: {
      [action: string]: boolean;
    };
  };
}

const rootReducer = combineReducers({
  requestReducer,
  config: ConfigReducer,
});

export default rootReducer;
