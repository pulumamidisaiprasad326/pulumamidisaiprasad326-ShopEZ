import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    mainImg: {
      type: String
    },

    size: {
      type: String
    },

    quantity: {
      type: Number,
      default: 1
    },

    price: {
      type: Number,
      required: true
    },

    discount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Cart = mongoose.model("carts", cartSchema);

export default Cart;