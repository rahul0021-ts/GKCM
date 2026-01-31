import mongoose from "mongoose";

const productSchema = new mongoose.Schema(//Creates a schema for products.
  {
    name: { type: String, index: true },//index: true → speeds up searches like
    image: String,
    sizes: [{ type: String, index: true }],//Array of available sizes (S, M, L, etc.).
    category: { type: String, index: true },
    section: { type: String, index: true },
    mrp: { type: Number, index: true },
    note: String
  },
  { timestamps: true }
  /**Automatically adds:
    createdAt
    updatedAt
    Very useful for sorting (newest products first). */
);

// Indexes for performance
/**Defines a compound index.
  *Optimizes queries that use multiple fields together. */
productSchema.index({
  name: 1,//1 → ascending order
  category: 1,
  section: 1,
  mrp: 1,
  sizes: 1
});

export default mongoose.model("Product", productSchema);
