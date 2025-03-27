import restockNotificationModel from "../models/restock_notification_model.js";

const restockNotificationController = {
    getRestockNotificationSettings (req, res) {
        let errorMessage = "Failed to establish connection in order to retrieve restock notification settings, please try again";

        try {
            const notificationSettings = restockNotificationModel.getRestockNotificationSettings();

            if (notificationSettings && typeof notificationSettings == "object" && Object.entries(notificationSettings).length > 0) {
                res.json(notificationSettings);
            }
            else {
                errorMessage = "There was an issue while trying to process the notification settings, please try again";
                throw new Error(errorMessage);
            }
        }
        catch (error) {
            res.status(502).json({
                error: {
                    message: errorMessage
                }
            });
            console.log(error);
        }
    },

    updateRestockNotificationSettings (req, res) {
        let errorMessage = "Failed to establish connection in order to update restock notification settings";
        const settings = req.body;

        try {
            const updatedNotificationSettings = restockNotificationController.updateRestockNotificationSettings(settings);

            if (updatedNotificationSettings) {
                res.status(200).json({
                    message: "Successfully updated notification settings"
                });
            }
            else {
                errorMessage = "There was an issue while updating the notification settings, please check the information before retrying";
                throw new Error(errorMessage);
            }
        }
        catch (error) {
            res.status(502).json({
                error: {
                    message: errorMessage
                }
            });
            console.log(error);
        }
    },

    sendRestockNotificationMessage (req, res) {
        const productID = Number(req.params.productID);
        let errorMessage = "Failed to establish connection in order to send restock notification message, please try again";

        try {
            const notificationMessageSent = restockNotificationModel.sendNotification(productID);

            if (notificationMessageSent) {
                res.json({
                    message: "Successfully sent restock message"
                });
            }
            else {
                errorMessage = "There was an issue sending the restock message, please check settings to ensure other notifications get sent successfully";
                throw new Error(errorMessage);
            }
        }
        catch (error) {
            res.status(502).json({
                error: {
                    message: errorMessage
                }
            });
            console.log(error);    
        }
    }
}

export default restockNotificationController;