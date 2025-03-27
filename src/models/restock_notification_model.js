import stockModel from "./stock_model.js";
import mailer from "../services/mailer/mailer.js";

let data = new Object({
    "settings": {
        "productThreshHold": 5,
        "notificationMessage": "Please be aware that product: {{ProductName}} stock is running on low",
        "notificationRecipients": ["nkululekovuyo0103@gmail.com"]
    }
});

const restockNotificationModel = {
    getRestockNotificationSettings () {
        return data.settings;
    },

    updateRestockNotificationSettings (settings) {
        let updatedNotificationSettings = true;

        const viableUpdaterMethods = Object.keys(settings);

        for (let method of viableUpdaterMethods) {
            updatedNotificationSettings = false;

            if (restockNotificationSettingsTypes.hasOwnProperty(method)) {
                let updaterMethodType = restockNotificationSettingsTypes[method];
                let updaterMethod = _settingsUpdateMethods[updaterMethodType];

                updaterMethod(settings.method);
                updatedNotificationSettings = true;
            }
        }

        return updatedNotificationSettings;
    },

    async sendNotification (productID) {
        const product = stockModel.getProduct(productID);
        let settings = data.settings;
        settings.notificationRecipientList = settings.notificationRecipients.length > 1 ? settings.notificationRecipients.join(", ") : settings.notificationRecipients; 
        settings.notificationMessage = settings.notificationMessage.replace("{{ProductName}}", product.ProductName);

        const notificationSent = await mailer.sendMail(settings);

        return notificationSent;
    }
};

const restockNotificationSettingsTypes = {
    productThreshHold: "ProductThreshHold",
    notificationMessage: "NotificationMessage",
    notificationRecipients: "NotificationRecipients"
};

const _settingsUpdateMethods = {
    ProductThreshHold (updatedThreshold) {
        if (updatedThreshold && typeof updatedThreshold == number) {
            settings.productThreshHold = updatedThreshold;
        }
    },

    notificationMessage (updatedMessage) {
        if (updatedMessage && typeof updatedMessage == "string") {
            settings.notificationMessage = updatedMessage;
        }
    },

    notificationRecipients (updatedRecipients) {
        if (updatedRecipients && updatedRecipients.length > 0) {
            settings.notificationRecipients = updatedRecipients;
        }
    }
};

export default restockNotificationModel;