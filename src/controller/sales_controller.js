import salesRecord from "../models/sales_record.js";

const salesController = {
    getSales (req, res) {
        let message = "Failed to fetch records, please try again";

        try {
            res.json({
                message: salesRecord
            });
        }
        catch (error) {
            console.log(error);

            res.json({
                error: {
                    message: message
                }
            });
        }
    }
};

export default salesController;