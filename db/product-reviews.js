// ./db/product_reviews.js

/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// "productId" INTEGER REFERENCES products(id) NOT NULL,
// "reviewId" INTEGER REFERENCES reviews(id) NOT NULL

/*------------------------------- Imports and Globals -----------------------------------*/

const client = require("./client");

/*---------------------------------- Functions ---------------------------------------*/

// Add productId to associated reviewId in products_reviews table
const addReviewToProduct = async (productId, reviewId) => {
    try {
        const {
            rows: [newProductReview],
        } = await client.query(
            `
                INSERT INTO product_reviews ("productId", "reviewId")
                VALUES($1, $2)
                RETURNING *;
            `,
            [productId, reviewId]
        );

        return newProductReview;
    } catch (error) {
        console.error(
            `There's been an error adding a review to a product @ addReviewToProduct(productId, reviewId) in ./db/product_reviews.js. ${error}`
        );
        throw error;
    }
};

// Remove productId from associated reviewId in products_reviews table
const removeReviewFromProduct = async (productReviewId) => {
    try {
        const isProductReview = await getProductReviewById(productReviewId);

        if (isProductReview) {
            const {
                rows: [removedProductReview],
            } = await client.query(
                `
                DELETE FROM product_reviews
                WHERE id=$1
                RETURNING *;
            `,
                [productReviewId]
            );

            return removedProductReview;
        } else {
            throw {
                name: "ProductReviewNotFoundError",
                message: "Cannot find product review with that productReviewId",
            };
        }
    } catch (error) {
        console.error(
            `There's been an error removing a review from a product @ removeReviewFromProduct(productReviewId) in ./db/product_reviews.js. ${error}`
        );
        throw error;
    }
};

// Returun review products object associated with the specified productReviewId
const getProductReviewById = async (productReviewId) => {
    try {
        const {
            rows: [productReview],
        } = await client.query(
            `
            SELECT * FROM product_reviews
            WHERE id=$1;
        `,
            [productReviewId]
        );

        return productReview;
    } catch (error) {
        console.error(
            `There's been an error getting a product review by id @ getProductReviewById(productReviewId) in ./db/product_reviews.js. ${error}`
        );
        throw error;
    }
};

// Returun product review object associated with the specified reviewId
const getProductReviewByReviewId = async (reviewId) => {
    try {
        const {
            rows: [productReview],
        } = await client.query(
            `
            SELECT * FROM product_reviews
            WHERE "reviewId"=$1;
        `,
            [reviewId]
        );

        return productReview;
    } catch (error) {
        console.error(
            `There's been an error getting a product review by id @ getProductReviewById(productReviewId) in ./db/product_reviews.js. ${error}`
        );
        throw error;
    }
};

//

/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    addReviewToProduct,
    removeReviewFromProduct,
    getProductReviewByReviewId,
};