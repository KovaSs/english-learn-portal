import { RootState } from '../rootReducer';

const moduleName = 'config';

// Get params
export const configStore = (state: RootState) => state[moduleName];
export const configApi = (state: RootState) => state[moduleName].api;
