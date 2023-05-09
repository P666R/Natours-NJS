exports.excludedFields = ['page', 'sort', 'limit', 'fields'];

exports.queryMap = new Map([
  ['gte', '$gte'],
  ['gt', '$gt'],
  ['lte', '$lte'],
  ['lt', '$lt'],
]);
