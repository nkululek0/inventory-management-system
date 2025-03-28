const salesRecordModel = {
    getSales() {
        let result = {
            "summarisedRecords": {
                "TotalRevenue": 200,
                "TotalProductQuantity": 1,
                "BestSellingProduct": { "ProductName": "Black TV", "ProductSku": "bltv", "ProductPricing": 200, "ProductSupplier": "Game" }
            },
            "AllProductsRevenue": [
                { "ProductName": "Black TV", "ProductSku": "bltv", "TotalRevenue": 200, "TotalQuantitySold": 1 }
            ]
        };

        return result;
    }
};

export default salesRecordModel;