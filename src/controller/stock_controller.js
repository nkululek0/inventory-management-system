import stock from "../models/stock.js";

const stockController = {
    getStock (req, res) {
        try {
            const products = stock.products;
            
            res.json(products);
        }
        catch (error) {
            console.log(error);
        }
    },

    addProduct (req, res) {
        const product = req.body;
        let { ProductID, ProductName, ProductSku, ProductStockLevel, ProductPricing, ProductSupplier } = product;
        ProductStockLevel = Number(ProductStockLevel);
        ProductPricing = Number(ProductPricing);

        try {
            const newProduct = {
                ProductID: ProductID,
                ProductName: ProductName,
                ProductSku: ProductSku,
                ProductStockLevel: ProductStockLevel,
                ProductPricing: ProductPricing,
                ProductSupplier: ProductSupplier
            }

            stock.products.push(newProduct);

            res.json({
                "message": `Product ${ ProductName } added successfully`
            });
        }
        catch (error) {
            console.log(error);    
        }
    },

    updateProductStockLevel (req, res) {
        const productID = Number(req.params.productID);
        const updatedProductStockLevel = Number(req.params.productStockLevel);
        let message = "Product stock level was not updated";

        try {
            for (let product of stock.products) {
                if (product.ProductID == productID) {
                    product.ProductStockLevel = updatedProductStockLevel;
                    message = "Successfully updated product stock level";
                    break;
                }
            }

            res.json({
                "message": message
            });
        }
        catch (error) {
            console.log(error);    
        }
    },

    deleteProduct (req, res) {
        const productID = Number(req.params.productID);
        let message = "Could not delete product";

        try {
            let productIndex = stock.products.findIndex((product) => product.ProductID == productID);

            if (productIndex != -1) {
                stock.products.splice(productIndex, 1);
                message = "Product successfully deleted";
            }

            res.json({
                "message": message
            });
        }
        catch (error) {
            console.log(error);    
        }
    }
};

export default stockController;