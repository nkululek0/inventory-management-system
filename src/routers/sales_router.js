import express from "express";
import salesController from "../controller/sales_controller.js";

const router = express.Router();

router.get("/", salesController.getSales);

export default router;