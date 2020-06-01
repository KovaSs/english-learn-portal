const MODULE_NAME = 'CONFIG';

const actionTypeBase = {
  GET_CONFIG_SETTINGS: `${MODULE_NAME}/GET_CONFIG_SETTINGS`,
  SET_CONFIG_SETTINGS: `${MODULE_NAME}/SET_CONFIG_SETTINGS`,
};

const ConfigActionTypes: Readonly<typeof actionTypeBase> = actionTypeBase;
export default ConfigActionTypes;
