//  ./routes/reviews.js

const express = require("express");
const reviewsRouter = express.Router();
const {
    createReview,
    getReviewById,
    updateReview,
    deleteReview,
} = require("../db/reviews.js");

const { requireUser } = require("../db/users.js");

reviewsRouter.use(function (req, res, next) {
    console.log("A request has been made to the /api/reviews endpoint.");
    next();
});

//Create Review Route---------------------------------Works!
reviewsRouter.post("/", async function (req, res, next) {
    const { productId, userId, title, rating, comment } = req.body;

    const reviewData = {};

    reviewData.productId = productId;
    reviewData.userId = userId;
    reviewData.title = title;
    reviewData.rating = rating;
    reviewData.comment = comment;

    const newReview = await createReview(reviewData);

    try {
        res.send({
            message: "Thanks for submitting a review!",
            review: newReview,
        });
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Update Review Route---------------------------------Works!
reviewsRouter.patch("/update/:reviewId", requireUser, async function (
    req,
    res,
    next
) {
    const { reviewId } = req.params;
    try {
        const review = await getReviewById(reviewId);

        const updatedReview = await updateReview(reviewId, review);
        if (updatedReview) {
            res.send({
                message: "Your review has been updated.",
                review: updatedReview,
            });
        }
    } catch (error) {
        console.error(error);
        next();
    }
});

// Delete Review Route------------------------------Works!
reviewsRouter.delete("/delete/:reviewId", requireUser, async function (
    req,
    res,
    next
) {
    const { reviewId } = req.params;
    try {
        const review = await getReviewById(reviewId);

        const deletedReview = await deleteReview(review.id);
        if (deletedReview) {
            res.send({
                message: "Your review has deleted.",
                review: deletedReview,
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = reviewsRouter;