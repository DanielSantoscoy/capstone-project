const express = require("express");
const categoriesRouter = express.Router();
const {
    createCategory,
    updateCategory,
    getCategoryById,
    getAllCategories,
    deleteCategory,
    getCategoryByName,
} = require("../db/categories.js");
const {
    addCategoryToProduct,
    removeCategoryFromProduct,
} = require("../db/category_products.js");

const { requireUser } = require("../db/users.js");
const { getProductById } = require("../db/index.js");

categoriesRouter.use(async function (req, res, next) {
    console.log("A request has been made to the /api/categories endpoint.");
    next();
});

// Get All Categories Route------------------------------WORKS!
categoriesRouter.get("/", async function (req, res, next) {
    const categories = await getAllCategories();
    try {
        res.send({
            message: "Here are all of the categories",
            allCategories: categories,
        });
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Create Category Route------------------------------WORKS!
categoriesRouter.post("/create", async function (req, res, next) {
    const { name } = req.body;
    const categoryData = {};
    categoryData.name = name;
    try {
        const newCategory = await createCategory(categoryData);
        res.send({ message: "New Category Created", category: newCategory });
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Update Category Route------------------------------WORKS!
categoriesRouter.patch("/update/:categoryId", requireUser, async function (
    req,
    res,
    next
) {
    const { categoryId } = req.params;
    const { name } = req.body;
    const categoryData = {};
    categoryData.name = name;
    try {
        const category = await getCategoryById(categoryId);
        if (category) {
            const updatedCategory = await updateCategory(
                categoryId,
                categoryData
            );
            res.send({
                message: "Category updated.",
                category: updatedCategory,
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Delete Category Route------------------------------WORKS!
categoriesRouter.delete("/delete/:id", async function (req, res, next) {
    const { id } = req.params;

    try {
        const deletedCategory = await deleteCategory(id);
        if (deleteCategory) {
            res.send({
                message: "Category deleted.",
                category: deletedCategory,
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Add Category to Product Route-------------------------Works!
categoriesRouter.patch("/addcategory/:productId", async function (
    req,
    res,
    next
) {
    const { categoryName } = req.body;
    const { productId } = req.params;

    try {
        const category = await getCategoryByName(categoryName);
        const { id } = category;
        const product = await getProductById(productId);
        const updatedProduct = await addCategoryToProduct(id, product.id);
        if (updatedProduct) {
            res.send({
                message: "Category added to product",
                product: updatedProduct,
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Delete Category from Product Route------------------------------WORKS!
categoriesRouter.delete("/deletecategory/:productId", async function (
    req,
    res,
    next
) {
    const { productId } = req.params;

    try {
        const productWithDeletedCategory = await removeCategoryFromProduct(
            productId
        );
        if (productWithDeletedCategory) {
            res.send({
                message: "Category removed from product",
                product: productWithDeletedCategory,
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = categoriesRouter;