import express from "express";

import {
  getAdminStats,
  getAllOrders,
  updateOrderStatus
} from "../controllers/adminController.js";

import {
  protect,
  adminOnly
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.use(protect);
router.use(adminOnly);

router.get(
  "/stats",
  getAdminStats
);

router.get(
  "/orders",
  getAllOrders
);

router.patch(
  "/orders/:id/status",
  updateOrderStatus
);

export default router;
