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
                errorMessage = "There was an issue while attempting to retrieve sales records, please try again";
                throw new Error(errorMessage);
            }
        }
        catch (error) {
            res.status(502).json({
                error: {
                    message: error.message
                }
            });
            console.log(error);
        }
    }
};

export default salesController;