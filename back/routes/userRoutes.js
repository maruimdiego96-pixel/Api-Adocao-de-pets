import express from "express";
import usersController from "../controllers/usersController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, usersController.getMe);
router.put("/me", authMiddleware, usersController.updateMe);

router.get("/", authMiddleware, adminMiddleware, usersController.getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware, usersController.getUserById);
router.put("/:id", authMiddleware, adminMiddleware, usersController.updateUser);
router.patch("/:id/deactivate", authMiddleware, adminMiddleware, usersController.deactivateUser);
router.patch("/:id/activate", authMiddleware, adminMiddleware, usersController.activateUser);

export default router;