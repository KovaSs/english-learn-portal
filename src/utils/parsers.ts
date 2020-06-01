import snakeCase from 'lodash/snakeCase';

/**
 * Функционал перобразования ключей в объекте к формату camelCase
 */
export function keysToCamel(o) {
  function isObject(o) {
    return o === Object(o) && !isArray(o) && typeof o !== 'function';
  }

  function isArray(a) {
    return Array.isArray(a);
  }

  function toCamel(s) {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      return $1
        .toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
  }

  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i);
    });
  }

  return o;
}

/**
 * Функционал перобразования ключей в объекте к формату snake_case
 */
export function keysToSnake(o) {
  function isObject(o) {
    return o === Object(o) && !isArray(o) && typeof o !== 'function';
  }

  function isArray(a) {
    return Array.isArray(a);
  }

  function toSnake(s) {
    return snakeCase(s);
  }

  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toSnake(k)] = keysToSnake(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToSnake(i);
    });
  }

  return o;
}

/**
 * Функционал удаления строковых id из объекта
 */
export function deleteStringId(obj) {
  function isObject(o) {
    return o === Object(o) && !isArray(o) && typeof o !== 'function';
  }

  function isArray(a) {
    return Array.isArray(a);
  }

  if (isObject(obj)) {
    const n = {};

    Object.keys(obj).forEach((k) => {
      if ((k === 'id' || k === 'buildingId') && typeof obj[k] === 'string') {
        // eslint-disable-next-line no-param-reassign
        delete obj[k];
      } else if (k === 'area' && typeof obj[k] === 'string') {
        n[k] = parseFloat(obj[k]);
      } else if (k === 'fiasId' && obj[k] === '') {
        n[k] = null;
      } else {
        n[k] = deleteStringId(obj[k]);
      }
    });

    return n;
  } else if (isArray(obj)) {
    return obj.map((i) => {
      return deleteStringId(i);
    });
  }

  return obj;
}
