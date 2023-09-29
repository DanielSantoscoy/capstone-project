// ./db/category_products.js

/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// "categoryId" INTEGER REFERENCES categories(id) NOT NULL,
// "productId" INTEGER REFERENCES products(id) NOT NULL

/*------------------------------- Imports and Globals -----------------------------------*/

const client = require("./client");
const { getCategoryById } = require("./categories");

/*---------------------------------- Functions ---------------------------------------*/

// Adds categoryId to associated productId in category_products table
const addCategoryToProduct = async (categoryId, productId) => {
    try {
        const isCategory = await getCategoryById(categoryId);

        if (isCategory) {
            const { rows: newProdCatgeory } = await client.query(
                `
                INSERT INTO category_products
                ("categoryId", "productId")
                VALUES ($1, $2)
                RETURNING *
            `,
                [categoryId, productId]
            );

            return newProdCatgeory;
        } else {
            throw {
                name: "CategoryNotFoundError",
                message: "Cannot find category with that categoryId",
            };
        }
    } catch (error) {
        console.error(
            `There's been an error adding a category to a product @ addCategoryToProduct(categoryId, productId) in ./db/category_products.js. ${error}`
        );
        throw error;
    }
};

// Removes categoryId from associated productId in category_products table
const removeCategoryFromProduct = async (categoryProductId) => {
    try {
        const isCategoryProduct = await getCategoryProductById(
            categoryProductId
        );

        if (isCategoryProduct) {
            const {
                rows: [deletedCategoryProduct],
            } = await client.query(
                `
                DELETE FROM category_products
                WHERE id=$1
                RETURNING *;
            `,
                [categoryProductId]
            );

            return deletedCategoryProduct;
        } else {
            throw {
                name: "CategoryProductNotFoundError",
                message:
                    "Cannot find category product with that categoryProductId",
            };
        }
    } catch (error) {
        console.error(
            `There's been an error removing a category from a product @ removeCategoryFromProduct(categoryProductId) in ./db/category_products.js. ${error}`
        );
        throw error;
    }
};

// Return category product associated with the specified categoryProductId
const getCategoryProductById = async (categoryProductId) => {
    try {
        const {
            rows: [categoryProduct],
        } = await client.query(
            `
            SELECT * FROM category_products
            WHERE id=$1;
        `,
            [categoryProductId]
        );

        return categoryProduct;
    } catch (error) {
        console.error(
            `There's been an error getting a category product by id @ getCategoryProductById(categoryProductId) in ./db/category_products.js. ${error}`
        );
        throw error;
    }
};

// Return an array of category product objects associated with the specified productId
const getCategoryProductsByProductId = async (productId) => {
    try {
        const { rows: categoryProductsArr } = await client.query(
            `
            SELECT * FROM category_products
            WHERE "productId"=$1;
        `,
            [productId]
        );

        return categoryProductsArr;
    } catch (error) {
        console.error(
            `There's been an error getting category products by product id @ getCategoryProductsByProductId(productId) in ./db/category_products.js. ${error}`
        );
        throw error;
    }
};

/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    addCategoryToProduct,
    removeCategoryFromProduct,
    getCategoryProductById,
    getCategoryProductsByProductId,
};