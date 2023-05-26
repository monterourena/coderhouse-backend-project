import { productModel } from "../models/product.model.js";

class ProductsService {
  getPaginatedProducts = (params) => {
    const { limit, page, sort, queryFilters } = params;
    
    // Sort by price only if sort query is received
    const aggregateStages = [{ $match: queryFilters }]
    if (sort) aggregateStages.push({ $sort : { price : sort } })
    const aggregate = productModel.aggregate(aggregateStages);

    return productModel.aggregatePaginate(aggregate, { limit, page });
  };
  getProducts = (params) => productModel.find(params);
  addProduct = (params) => productModel.create(params);
  getProductById = (pid) => productModel.findById(pid).lean();
  updateProductById = (pid, params) =>
    productModel.findByIdAndUpdate(pid, { $set: params });
  deleteProductById = (pid) => productModel.findByIdAndDelete(pid);
}

export { ProductsService };
