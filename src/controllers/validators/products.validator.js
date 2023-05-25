const validator = [];

validator.getProducts = (queries) => {
  const DEFAULT_LIMIT = 10;
  const DEFAULT_PAGE = 1;
  const DEFAULT_SORT = null;

  const {
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    sort = DEFAULT_SORT,
    ...query
  } = queries;

  let isValid = true;

  //Sort validation
  const validSortRegex = /^(asc|desc|null)$/i;
  isValid = validSortRegex.test(sort);
  if (!isValid) return { isValid, validQueries: {} };

  // Limit and page numeric validation
  const numericRegex = /^[0-9]+$/;
  isValid = numericRegex.test(limit) && numericRegex.test(page);
  if (!isValid) return { isValid, validQueries: {} };

  return {
    isValid,
    validQueries: { limit, page, query, sort },
  };
};

export { validator };
