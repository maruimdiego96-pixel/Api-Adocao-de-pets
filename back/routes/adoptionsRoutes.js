import express from "express";
import adoptionsController from "../controllers/adoptionsControllers";

const router = express.Router();

router.post("/", adoptionsController.PerformAdoption);
router.get("/my", adoptionsController.MyAdoptions);
router.get("/", adoptionsController.AllAdoptions);      

export default router;