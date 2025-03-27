import stockModel from "../models/stock_model.js";

const stockController = {
    getStock (req, res) {
        let errorMessage = "Failed to establish connection to fetch stock information, please try again";
        
        try {
            const products = stockModel.getStock();
            
            if (typeof products == "object" && Object.entries(products).length > 0) {
                res.json(products);
            }
            else {
                errorMessage = "There was an issue while trying to process stock information, please try again";
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
    },

    addProduct (req, res) {
        let errorMessage = "Failed to establish connection in order to add product, please try again";
        const product = req.body;
        let { ProductID, ProductName, ProductSku, ProductStockLevel, ProductPricing, ProductSupplier } = product;
        ProductStockLevel = Number(ProductStockLevel);
        ProductPricing = Number(ProductPricing);
        
        const newProduct = {
            ProductID: ProductID,
            ProductName: ProductName,
            ProductSku: ProductSku,
            ProductStockLevel: ProductStockLevel,
            ProductPricing: ProductPricing,
            ProductSupplier: ProductSupplier
        };

        try {
            const addedProduct = stockModel.addProduct(newProduct);

            if (addedProduct) {
                res.json({
                    "message": `Product ${ ProductName } added successfully`
                });
            }
            else {
                errorMessage = "Could not add product to database, please ensure that correct data is used before trying again";
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
    },

    updateProductStockLevel (req, res) {
        const productID = Number(req.params.productID);
        const updatedProductStockLevel = Number(req.params.productStockLevel);
        let errorMessage = "Product stock level was not updated";

        try {
            const updatedProduct = stockModel.updateProductStockLevel(productID, updatedProductStockLevel);

            if (updatedProduct) {
                res.json({
                    "message": "Successfully updated product stock level"
                });
            }
            else {
                errorMessage = "There was an issue while trying to update the stock level, please check your data and try again";
                throw new Error(errorMessage);
            }
        }
        catch (error) {
            res.status(502).json({
                "error": {
                    "message": error.message
                }
            });
            console.log(error);    
        }
    },

    deleteProduct (req, res) {
        const productID = Number(req.params.productID);
        let errorMessage = "Could not delete product";

        try {
            let successfullyDeletedProduct = stockModel.deleteProduct(productID);

            if (successfullyDeletedProduct) {
                res.json({
                    message: "Successfully deleted product"
                });
            }
            else {
                errorMessage = "There was an issue while attempting to delete the product, please try again";
                throw new Error(errorMessage);
            }

        }
        catch (error) {
            res.json({
                "error": {
                    "message": error.message
                }
            });
            console.log(error);    
        }
    }
};

export default stockController;