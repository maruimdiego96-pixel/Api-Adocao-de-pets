import express from "express";
import adoptionController from "../controllers/adoptionsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, adoptionController.CompleteTheAdoption);
router.get("/me", authMiddleware, adoptionController.getMyAdoption);

 router.get("/", authMiddleware, adminMiddleware, adoptionController.getAllAdoption);

export default router;