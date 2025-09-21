import express from "express";
import { readFileSync } from "fs";
import path from "path";


const router = express.Router();

router.get("/", (req, res) => {
  const filePath = path.resolve("src/data/employee.json");
  const data = JSON.parse(readFileSync(filePath));
  res.json(data); 
});

export default router;
