import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      default: "📦"
    },

    image: {
      type: String,
      default: ""
    },

    price: {
      type: Number,
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    _id: false
  }
);

const shippingAddressSchema =
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true
      },

      phone: {
        type: String,
        required: true
      },

      address: {
        type: String,
        required: true
      },

      city: {
        type: String,
        required: true
      },

      state: {
        type: String,
        required: true
      },

      postalCode: {
        type: String,
        required: true
      },

      country: {
        type: String,
        default: "India"
      }
    },
    {
      _id: false
    }
  );

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: {
      type: [orderItemSchema],
      required: true
    },

    shippingAddress: {
      type: shippingAddressSchema,
      required: true
    },

    subtotal: {
      type: Number,
      required: true
    },

    shippingCharge: {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["COD"],
      default: "COD"
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed"
      ],
      default: "Pending"
    },

    status: {
      type: String,
      enum: [
        "Placed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
      ],
      default: "Placed"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Order",
  orderSchema
);
