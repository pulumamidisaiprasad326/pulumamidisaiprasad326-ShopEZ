import Order from "../models/orderModel.js";

// PLACE ORDER
export const placeOrder = async (req, res) => {
  try {
    const invoiceNumber = "INV-" + Date.now();

    const totalAmount =
      (Number(req.body.price) || 0) *
      (Number(req.body.quantity) || 1);

    const order = await Order.create({
      ...req.body,
      invoiceNumber,
      totalAmount
    });

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET USER ORDERS
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET SINGLE ORDER
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found"
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: req.body.orderStatus
      },
      {
        new: true
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order Status Updated Successfully",
      order
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// CANCEL ORDER
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: "Cancelled"
      },
      {
        new: true
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order Cancelled Successfully",
      order
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};