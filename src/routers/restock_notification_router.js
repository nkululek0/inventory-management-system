import express from "express";
import restockNotificationController from "../controller/restock_notification_controller.js";

const router = express.Router();

router.get("/", restockNotificationController.getRestockNotificationSettings);

router.put("/settings", restockNotificationController.updateRestockNotificationSettings);

router.post("/send-restock-notification/:productID", restockNotificationController.sendRestockNotificationMessage);

export default router;