import express from "express";

import { index } from "../controllers/homeController";

const router = express.Router();
router.get("", index);

export default router;
