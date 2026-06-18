import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory
} from "../controllers/productController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Routes
router.post(
  "/add",
  verifyToken,
  verifyAdmin,
  addProduct
);

router.put(
  "/update/:id",
  verifyToken,
  verifyAdmin,
  updateProduct
);

router.delete(
  "/delete/:id",
  verifyToken,
  verifyAdmin,
  deleteProduct
);

// Public Routes
router.get("/all", getProducts);

router.get(
  "/search/:keyword",
  searchProducts
);

router.get(
  "/category/:category",
  getProductsByCategory
);

router.get("/:id", getProductById);

export default router;