import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const collection = 'products'

const ownerValidator = {
  validator: function (value) {
    if (value === 'ADMIN' || mongoose.Types.ObjectId.isValid(value)) return true
    return false
  },
  message: 'Owner must be a Mongo ObjectID or "ADMIN"'
}


const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    code: String,
    owner: {
      type: mongoose.Schema.Types.Mixed,
      validate: ownerValidator
    },
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: []
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

schema.plugin(aggregatePaginate)

const productModel = mongoose.model(collection, schema)

export { productModel, schema as productSchema }
