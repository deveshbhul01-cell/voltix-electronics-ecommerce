import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    oldPrice: {
      type: Number,
      default: 0
    },

    icon: {
      type: String,
      default: "📦"
    },

    image: {
      type: String,
      default: ""
    },

    rating: {
      type: Number,
      default: 0
    },

    reviews: {
      type: Number,
      default: 0
    },

    badge: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      required: true
    },

    features: [
      {
        type: String
      }
    ],

    stock: {
      type: Number,
      default: 20,
      min: 0
    },

    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Product",
  productSchema
);
