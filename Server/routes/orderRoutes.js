import express from "express";

import {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
  cancelOrder,
  getOrderById
} from "../controllers/orderController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ================= ADMIN ROUTES ================= */

// Get All Orders
router.get(
  "/all",
  verifyToken,
  verifyAdmin,
  getAllOrders
);

// Update Order Status
router.put(
  "/status/:id",
  verifyToken,
  verifyAdmin,
  updateOrderStatus
);

/* ================= USER ROUTES ================= */

// Place Order
router.post(
  "/place",
  verifyToken,
  placeOrder
);

// Get Single Order
router.get(
  "/details/:id",
  verifyToken,
  getOrderById
);

// Cancel Order
router.put(
  "/cancel/:id",
  verifyToken,
  cancelOrder
);

// Get User Orders
router.get(
  "/:userId",
  verifyToken,
  getUserOrders
);

export default router;