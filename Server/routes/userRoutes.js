import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllUsers
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Test Route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "User Route Working"
  });
});

// ================= AUTH =================

router.post("/register", registerUser);

router.post("/login", loginUser);

// ================= PROFILE =================

router.get(
  "/profile",
  verifyToken,
  getProfile
);

router.put(
  "/update",
  verifyToken,
  updateProfile
);

// ================= ADMIN =================

router.get(
  "/all",
  verifyToken,
  verifyAdmin,
  getAllUsers
);

export default router;