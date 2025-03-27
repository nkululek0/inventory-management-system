import salesRecordModel from "../models/sales_record.js";

const salesController = {
    getSales (req, res) {
        let errorMessage = "Failed to fetch records, please try again";

        try {
            let data = salesRecordModel.getSales();

            if (typeof data == "object" && Object.entries(data).length > 0) {
                res.json(data);
            }
            else {
                message = "There was an issue while attempting to retrieve sales records, please try again";
                throw new Error(message);
            }
        }
        catch (error) {
            console.log(error);

            res.json({
                error: {
                    message: errorMessage
                }
            });
        }
    }
};

export default salesController;