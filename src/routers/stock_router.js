import express from "express";
import stockController from "../controller/stock_controller.js";

const router = express.Router();

router.get("/", stockController.getStock);

router.post("/product", stockController.addProduct);

router.put("/:productID/:productStockLevel", stockController.updateProductStockLevel);

router.delete("/:productID", stockController.deleteProduct);

export default router;