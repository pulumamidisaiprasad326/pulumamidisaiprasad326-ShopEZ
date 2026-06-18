import express from "express";
import {
  addAddress,
  getAddresses
} from "../controllers/addressController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ADD ADDRESS
router.post(
  "/add",
  verifyToken,
  addAddress
);

// GET USER ADDRESSES
router.get(
  "/my",
  verifyToken,
  getAddresses
);

export default router;