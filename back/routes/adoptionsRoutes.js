import express from "express";
import adoptionController from "../controllers/adoptionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, adoptionController.createAdoption);
router.get("/my", authMiddleware, adoptionController.getMyAdoption);

router.get("/", authMiddleware, adminMiddleware, adoptionController.getAllAdoption);

export default router;