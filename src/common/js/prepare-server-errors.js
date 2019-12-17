import { forEach, isObject } from 'lodash';

const errorMessages = {
  expired: 'Срок действия вышел',
  invalidNumber: 'Некорректный номер',
};

export default errors => {
  const result = {};

  function flatten(obj, prefix = '') {
    forEach(obj, (value, key) => {
      if (isObject(value)) {
        flatten(value, `${prefix}${prefix ? '.' : ''}${key}`);
      } else if (key === 0) {
        result[prefix] = [errorMessages[value]];
      }
    });
  }
  flatten(errors);

  return result;
};
