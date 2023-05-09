const { excludedFields, queryMap } = require('./config');

exports.filteredObj = (queryObj) =>
  Object.keys(queryObj)
    .filter((key) => !excludedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = queryObj[key];
      return obj;
    }, {});

exports.formatQueries = (queryObj) =>
  Object.entries(queryObj).reduce((obj, [key, value]) => {
    if (typeof value === 'object' && value !== null) {
      const formatOutput = Object.entries(value).reduce(
        (object, [operator, val]) => {
          const mongoOperator = queryMap.get(operator);
          if (mongoOperator) {
            object[mongoOperator] = val;
          }
          return object;
        },
        {}
      );
      if (Object.keys(formatOutput).length !== 0) {
        obj[key] = formatOutput;
      }
    } else {
      obj[key] = value;
    }
    return obj;
  }, {});
