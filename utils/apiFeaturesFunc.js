const apiFeaturesFunc = (req, res, resource) => {
  // 1.filtering
  let queryStr = JSON.stringify({ ...req.query });
  queryStr = queryStr.replace(/\b(gte?|lte?)\b/g, (match) => `$${match}`);
  let query = resource.find(JSON.parse(queryStr));

  // 2. sorting (based on 1 or more fields)
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt _id');
  }

  // 3. field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // 4. pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  return query;
};

module.exports = apiFeaturesFunc;
