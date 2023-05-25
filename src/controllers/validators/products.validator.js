import { productSchema } from "../../models/product.model.js";
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
  isValid = isValid && validSortRegex.test(sort);


  // Limit and page numeric validation
  const numericRegex = /^[0-9]+$/;
  isValid = isValid && numericRegex.test(limit) && numericRegex.test(page);
  

  // Query validation
  const productSchemaKeys = Object.keys(productSchema.paths);
  const queryKeys = Object.keys(query);
  isValid = isValid && queryKeys.every(key => productSchemaKeys.includes(key))
 

  return {
    isValid,
    mappedQueries: { limit, page, query, sort },
  };
};

export { validator };
