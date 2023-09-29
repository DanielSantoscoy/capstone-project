// ./db/shop_products.js

/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// "shopId" INTEGER REFERENCES shops(id) NOT NULL,
// "productId" INTEGER REFERENCES products(id) NOT NULL

/*------------------------------- Imports and Globals -----------------------------------*/

const client = require("./client");

/*---------------------------------- Functions ---------------------------------------*/

// Adds productId to associated shopId in shop_products table
const addProductToShop = async (productId, shopId) => {
    try {
        const {
            rows: [result],
        } = await client.query(
            `
            INSERT INTO shop_products("productId","shopId")
            VALUES ($1,$2)
            RETURNING *;
            `,
            [productId, shopId]
        );

        return result;
    } catch (error) {
        console.error(
            `There's been an error adding a user to a product @ addShopToProduct(productId, shopId) in ./db/shop_products.js. ${error}`
        );
        throw error;
    }
};

// Removes productId from associated shopId in shop_products table
const deleteProductFromShop = async (shopProductId) => {
    try {
        const isShopProduct = await getShopProductById(shopProductId);

        if (isShopProduct) {
            const {
                rows: [deletedResult],
            } = await client.query(
                `
                DELETE FROM shop_products
                WHERE id=$1
                RETURNING *;
            `,
                [shopProductId]
            );

            return deletedResult;
        } else {
            throw {
                name: "ShopProductNotFoundError",
                message: "Cannot find shop product with that shopProductId",
            };
        }
    } catch (error) {
        console.error(
            `There's been an error deleting a productId from a asscociated shopId @ deleteProductFromShop(shopProductId) in ./db/shop_products.js. ${error}`
        );
        throw error;
    }
};

// Returns user product object connected to provided userProductId
const getShopProductById = async (shopProductId) => {
    try {
        const {
            rows: [shopProduct],
        } = await client.query(
            `
            SELECT * FROM shop_products
            WHERE id=$1;
        `,
            [shopProductId]
        );

        return shopProduct;
    } catch (error) {
        console.error(
            `There's been an error getting a shop product by id @ getShopProductById(shopProductId) in ./db/shop_products.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of all userProduct objects associated with the specified product id, if any
const getShopProductsByProductId = async (productId) => {
    try {
        const { rows: shopProductsArr } = await client.query(
            `
            SELECT * FROM shop_products
            WHERE "productId"=$1;
        `,
            [productId]
        );

        return shopProductsArr;
    } catch (error) {
        console.error(
            `There's been an error getting shop products by product id @ getShopProductsByProductId(productId) in ./db/shop_products.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of all userProduct objects associated with the specified userId, if any
const getShopProductsByShopId = async (shopId) => {
    try {
        const { rows: shopProductsArr } = await client.query(
            `
            SELECT * FROM shop_products
            WHERE "shopId"=$1;
        `,
            [shopId]
        );

        return shopProductsArr;
    } catch (error) {
        console.error(
            `There's been an error getting shop products by shopid @ getShopProductsByUserId(productId) in ./db/shop_products.js. ${error}`
        );
        throw error;
    }
};

/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    addProductToShop,
    deleteProductFromShop,
    getShopProductsByProductId,
    getShopProductsByShopId,
};