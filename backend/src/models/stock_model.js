let data = new Object({
    "products": [
        { "ProductID": 1, "ProductName": "Black TV", "ProductSku": "bltv", "ProductStockLevel": 10, "ProductPricing": 200, "ProductSupplier": "Game" }
    ]
});

const stockModel = {
    getStock () {
        return data;
    },

    getProduct (productID) {
        let result = -1;
        let product = data.products.filter((value) => {
            if (value.ProductID == productID) {
                return value;
            }
        });

        if (product.length > 0) {
            result = product[0];
        }
        
        return result;
    },

    addProduct (product) {
        let addedProductedSuccessfully = false;
        
        if (product && typeof product == "object") {
            data.products.push(product);
            addedProductedSuccessfully = true;
        }

        return addedProductedSuccessfully;
    },

    updateProductStockLevel (productID, updatedProductStockLevel) {
        let updatedProductSuccessfully = false;

        for (let product of data.products) {
            if (product.ProductID == productID) {
                product.ProductStockLevel = updatedProductStockLevel;
                updatedProductSuccessfully = true;
                break;
            }
        }

        return updatedProductSuccessfully;
    },

    deleteProduct (productID) {
        let deletedSuccessfully = false;
        let productIndex = data.products.findIndex((product) => product.ProductID == productID);

        if (productIndex != -1) {
            data.products.splice(productIndex, 1);
            deletedSuccessfully = true;
        }
        return deletedSuccessfully;
    }
}

export default stockModel;