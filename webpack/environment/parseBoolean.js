/**
 * Значение в env | cli приходят строкой
 * @param value {string}
 * @param defaultValue {boolean}
 * @returns {boolean}
 */
module.exports = function parseBoolean(value, defaultValue) {
  switch ((value || '').toLowerCase().trim()) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return defaultValue;
  }
};
