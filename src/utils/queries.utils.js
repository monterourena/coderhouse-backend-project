import mongoose from "mongoose";

const convertQueriesTypeBySchema = ({ validatedQueries, schema }) => {
  const convertedQueries = {};
  for (const currentQuery in validatedQueries) {
    const currentQueryValue = validatedQueries[currentQuery];
    const currentQueryType = schema.path(currentQuery).instance;

    let convertedValue;

    switch (currentQueryType) {
      case "Number":
        convertedValue = parseInt(currentQueryValue);
        break;
      case "Boolean":
        convertedValue = currentQueryValue === "true";
        break;
      case "ObjectId":
        convertedValue = new mongoose.Types.ObjectId(currentQueryValue);
        break;
      case "Date":
        convertedValue = new Date(currentQueryValue);
        break;
      default:
        convertedValue = currentQueryValue; // Valor sin conversión si no se encuentra un tipo de dato válido
    }
    convertedQueries[currentQuery] = convertedValue;
  }

  return convertedQueries;
};

const hasValidQueriesBySchema = ({ queries, schema, disabledSchemaKeys }) => {
  let schemaKeys = Object.keys(schema.paths);
  const queryKeys = Object.keys(queries);

  schemaKeys = schemaKeys.filter((key) => !disabledSchemaKeys.includes(key));
  return queryKeys.every((key) => schemaKeys.includes(key));
};

export { convertQueriesTypeBySchema, hasValidQueriesBySchema };
