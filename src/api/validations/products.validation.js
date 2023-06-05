import { productSchema } from "../models/product.model.js";
import {
  convertQueriesTypeBySchema,
  hasValidQueriesBySchema,
} from "../../utils/queries.utils.js";
const validator = [];

validator.validateQueries = (queries) => {
  const DEFAULT_LIMIT = 10;
  const DEFAULT_PAGE = 1;
  const DEFAULT_SORT = null;
  const DISABLED_SCHEMA_FIELDS = ["thumbnails"];
  const VALID_SORT_MAP = {"desc":-1, "asc":1}

  let {
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    sort = DEFAULT_SORT,
    ...queryFilters
  } = queries;

  let isValid = true;

  //Sort validation and conversion
  const validSortRegex = /^(asc|desc|null)$/i;
  isValid = isValid && validSortRegex.test(sort);
  if(sort) sort = VALID_SORT_MAP[sort.toLowerCase()]

  // Limit and page numeric validation
  const numericRegex = /^[0-9]+$/;
  isValid = isValid && numericRegex.test(limit) && numericRegex.test(page);

  // Query validation by schema
  isValid = isValid && hasValidQueriesBySchema({
      queries: queryFilters,
      schema: productSchema,
      disabledSchemaKeys: DISABLED_SCHEMA_FIELDS,
    });

  // Only valid queries are converted
  if (isValid) queryFilters = convertQueriesTypeBySchema({
      validatedQueries: queryFilters,
      schema: productSchema,
    });

  return {
    isValid,
    mappedQueries: { limit, page, queryFilters, sort },
  };
};

export { validator as productsValidator };
