import mongoose from "mongoose";

const collection = "tickets";

const purchasedItemsSchema = mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number
})


const schema = new mongoose.Schema(
  {
    code: String,
    amount: Number,
    purchaser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users"
    },
    purchasedItems: [purchasedItemsSchema]
  },
  { timestamps: { purchaseDatetime: "created_at", updatedAt: "updated_at" } }
);

const ticketModel = mongoose.model(collection, schema);
export { ticketModel };