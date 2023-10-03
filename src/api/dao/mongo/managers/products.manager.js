import { productModel } from "../models/product.model.js";

class ProductsManager {
  getPaginatedProducts = (params) => {
    const { limit, page, sort, queryFilters } = params;
    
    // Sort by price only if sort query is received
    const aggregateStages = [{ $match: queryFilters }]
    if (sort) aggregateStages.push({ $sort : { price : sort } })
    const aggregate = productModel.aggregate(aggregateStages);

    return productModel.aggregatePaginate(aggregate, { limit, page });
  };
  getProducts = (params) => productModel.find(params).lean();
  addProduct = (params) => productModel.create(params);
  getProductById = (pid) => productModel.findById(pid).lean();
  updateProductById = (pid, params) =>
    productModel.findByIdAndUpdate(pid, { $set: params },{new: true});
  deleteProductById = (pid) => productModel.findByIdAndDelete(pid);

  decreaseStockManyProducts = (purchasedProducts) => {
    purchasedProducts.forEach(async product => {
      const { id, quantity } = product;
      await productModel.updateOne(
        { _id: id },
        { $inc: { stock: -quantity } }
      );
    })
  }
}

export { ProductsManager };
