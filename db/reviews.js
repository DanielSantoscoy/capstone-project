// ./db/reviews.js

/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// "productId" INTEGER REFERENCES products(id) NOT NULL,
// "userId" INTEGER REFERENCES users(id) NOT NULL,
// title VARCHAR(255),
// rating INTEGER NOT NULL,
// comment TEXT NOT NULL

/*------------------------------- Imports and Globals -----------------------------------*/

const client = require("./client");
const {
    addReviewToProduct,
    removeReviewFromProduct,
    getProductReviewByReviewId,
} = require("./product_reviews");

/*---------------------------------- Functions ---------------------------------------*/

// Creates a new review in the reviews table, and return the new review object
const createReview = async ({ productId, userId, title, rating, comment }) => {
    try {
        const {
            rows: [review],
        } = await client.query(
            `
        INSERT INTO reviews ("productId", "userId", title, rating, comment)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *;
        `,
            [productId, userId, title, rating, comment]
        );

        return review;
    } catch (error) {
        console.error(
            `There's been an error creating a review @ createReview({productId, userId, title, rating, comment}) in ./db/reviews.js. ${error}`
        );
        throw error;
    }
};

// Deletes a review from the reviews table, and return the deleted review object
const deleteReview = async (reviewId) => {
    try {
        const {
            rows: [deletedReview],
        } = await client.query(
            `
            DELETE FROM reviews 
            WHERE id=$1
            RETURNING *
        `,
            [reviewId]
        );

        return deletedReview;
    } catch (error) {
        console.error(
            `There's been an error removing a review @ deleteReview(reviewId) in ./db/reviews.js. ${error}`
        );
        throw error;
    }
};

// Updates a review in the reviews table, and return the updated review object
const updateReview = async (reviewId, fields = {}) => {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    if (setString.length === 0) {
        return;
    }

    try {
        const {
            rows: [updatedReview],
        } = await client.query(
            `
            UPDATE reviews
            SET ${setString}
            WHERE id=${reviewId}
            RETURNING *;
        `,
            Object.values(fields)
        );

        return updatedReview;
    } catch (error) {
        console.error(
            `There's been an error updating a review @ updateReview(reviewId, fields={}) in ./db/reviews.js. ${error}`
        );
        throw error;
    }
};

// Returns the review object of the review with the specified reviewId from the reviews table
const getReviewById = async (reviewId) => {
    try {
        const {
            rows: [review],
        } = await client.query(
            `
            SELECT * FROM reviews
            WHERE id=$1;
        `,
            [reviewId]
        );

        return review;
    } catch (error) {
        console.error(
            `There's been an error getting a review by id @ getReviewById(reviewId) in ./db/reviews.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of all review objects associated with the product with the specified productId from the reviews table
const getReviewsByProductId = async (productId) => {
    try {
        const {
            rows: [reviews],
        } = await client.query(
            `SELECT * FROM reviews
            WHERE "productId"=$1`,
            [productId]
        );

        return reviews;
    } catch (error) {
        console.error(
            `There's been an error getting reviews by product id @ getReviewsByProductId(productId) in ./db/reviews.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of all review objects associated with the user with the specified userId from the reviews table
const getReviewsByUserId = async (userId) => {
    try {
        const { rows: reviews } = await client.query(
            `SELECT * FROM reviews
            WHERE "userId"=$1`,
            [userId]
        );

        return reviews;
    } catch (error) {
        console.error(
            `There's been an error getting review by user id @ getReviewsByUserId(userId) in ./db/reviews.js. ${error}`
        );
        throw error;
    }
};

/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    createReview,
    deleteReview,
    updateReview,
    getReviewsByProductId,
    getReviewsByUserId,
    getReviewById,
};