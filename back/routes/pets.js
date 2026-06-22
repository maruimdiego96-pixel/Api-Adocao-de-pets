import express from "express";
import petsController from "../controllers/petsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", petsController.getAllPets);
router.get("/available", petsController.getAvailableBooks);
router.get("/:id", petsController.getPetsById);

router.post("/", authMiddleware, adminMiddleware, petsController.createPets);
router.put("/:id", authMiddleware, adminMiddleware, petsController.updatePets);
router.patch("/:id/deactivate", authMiddleware, adminMiddleware, petsController.deactivatePet);
router.patch("/:id/activate", authMiddleware, adminMiddleware, petController.activatePet);

