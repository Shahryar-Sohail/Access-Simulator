import express from "express";
import { handleSimulate } from "../controllers/simulateController.js";

const router = express.Router();
    
router.get("/", handleSimulate);

export default router;
