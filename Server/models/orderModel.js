import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
// User Details
userId: {
type: String,
required: true
},


name: {
  type: String
},

email: {
  type: String
},

mobile: {
  type: String
},

address: {
  type: String
},

city: {
  type: String
},

state: {
  type: String
},

pincode: {
  type: String
},

// Product Details
title: {
  type: String
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
  default: 0
},

discount: {
  type: Number,
  default: 0
},

totalAmount: {
  type: Number,
  default: 0
},

// Payment
paymentMethod: {
  type: String,
  default: "COD"
},

paymentStatus: {
  type: String,
  default: "Pending"
},

razorpayOrderId: {
  type: String
},

razorpayPaymentId: {
  type: String
},

// Invoice
invoiceNumber: {
  type: String
},

// Dates
orderDate: {
  type: Date,
  default: Date.now
},

deliveryDate: {
  type: Date
},

// Status
  orderStatus: {
    type: String,
    enum: [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ],
    default: "Pending"
  }
},
{
  timestamps: true
});

const Order = mongoose.model(
  "orders",
  orderSchema
);

export default Order;
