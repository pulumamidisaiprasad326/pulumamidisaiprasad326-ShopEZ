import express from "express";

import {
  getDashboardStats,
  getOrderStats
} from "../controllers/adminController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// ================= DASHBOARD STATS =================

router.get(
  "/stats",
  verifyToken,
  verifyAdmin,
  getDashboardStats
);

// ================= ORDER ANALYTICS =================

router.get(
  "/order-stats",
  verifyToken,
  verifyAdmin,
  getOrderStats
);

// Optional (Backward Compatibility)

router.get(
  "/dashboard",
  verifyToken,
  verifyAdmin,
  getDashboardStats
);

export default router;