import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

// ================= DASHBOARD STATS =================

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const orders = await Order.find({
      orderStatus: {
        $ne: "Cancelled"
      }
    });

    const revenue = orders.reduce(
      (total, order) =>
        total +
        (Number(order.price) || 0) *
          (Number(order.quantity) || 0),
      0
    );

    res.status(200).json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      revenue
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= ORDER ANALYTICS =================

export const getOrderStats = async (req, res) => {
  try {
    const pending =
      await Order.countDocuments({
        orderStatus: "Pending"
      });

    const processing =
      await Order.countDocuments({
        orderStatus: "Processing"
      });

    const shipped =
      await Order.countDocuments({
        orderStatus: "Shipped"
      });

    const delivered =
      await Order.countDocuments({
        orderStatus: "Delivered"
      });

    const cancelled =
      await Order.countDocuments({
        $or: [
          { orderStatus: "Cancelled" },
          { orderStatus: "cancelled" }
        ]
      });

    res.status(200).json({
      success: true,
      pending,
      processing,
      shipped,
      delivered,
      cancelled
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};