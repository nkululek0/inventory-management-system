import nodemailer from "nodemailer";

import "dotenv/config";

const mailer = {
    /**
     * Configurations of the email sender.
     */
    transporter: nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_SENDER_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    }),

    /**
     * Configurations of the email receiver.
     */
    mailOptions: {
        from: {
            name: process.env.EMAIL_SENDER_NAME,
            address: process.env.EMAIL_SENDER_ADDRESS
        },
        to: "",
        subject: "",
        html: ""
    },

    sendMail: async function (mailConfiguration) {
        let self = this;

        self.mailOptions.to = mailConfiguration.notificationRecipientList;
        self.mailOptions.subject = "Restock Notification";
        self.mailOptions.html = `<p>${mailConfiguration.notificationMessage}<p>`;

        try {
            await self.transporter.sendMail(self.mailOptions);
            console.log("email has been sent!");
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};

export default mailer;