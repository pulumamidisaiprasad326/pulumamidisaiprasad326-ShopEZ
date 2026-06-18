import express from "express";
import {
  addToCart,
  getUserCart,
  removeCartItem,
  updateCartQuantity,
  clearCart
} from "../controllers/cartController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Item To Cart
router.post(
  "/add",
  verifyToken,
  addToCart
);

// Get User Cart
router.get(
  "/:userId",
  verifyToken,
  getUserCart
);

// Update Quantity
router.put(
  "/update/:id",
  verifyToken,
  updateCartQuantity
);

// Remove Single Item
router.delete(
  "/remove/:id",
  verifyToken,
  removeCartItem
);

// Clear Entire Cart
router.delete(
  "/clear/:userId",
  verifyToken,
  clearCart
);

export default router;