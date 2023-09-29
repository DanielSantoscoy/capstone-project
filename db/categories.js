// ./db/categories.js

/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// name VARCHAR(25) UNIQUE NOT NULL

/*------------------------------- Imports and Globals -----------------------------------*/

const client = require("./client");

/*---------------------------------- Functions ---------------------------------------*/

// Adds a new category to the categories table and returns the new category object
const createCategory = async ({ name }) => {
    try {
        const {
            rows: [category],
        } = await client.query(
            `INSERT INTO categories (name)
             VALUES($1)
             RETURNING *;
            `,
            [name]
        );

        return category;
    } catch (error) {
        console.error(
            `There's been an error creating a new category @ createCategory({name}) in ./db/categories.js. ${error}`
        );
        throw error;
    }
};

// Updates a category in the categories table and returns the updated category object
const updateCategory = async (id, fields) => {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    if (setString.length === 0) {
        return;
    }

    try {
        const {
            rows: [category],
        } = await client.query(
            `
          UPDATE categories
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `,
            Object.values(fields)
        );

        return category;
    } catch (error) {
        console.error(
            `There's been an error updating a category @ updateCategory(id, fields) in ./db/categories.js. ${error}`
        );
        throw error;
    }
};

// Deletes category from the categories table and returns the deleted category object
const deleteCategory = async (categoryId) => {
    try {
        const {
            rows: [deletedCategory],
        } = await client.query(
            `
            DELETE FROM categories
            WHERE id=$1
            RETURNING *
        `,
            [categoryId]
        );

        return deletedCategory;
    } catch (error) {
        console.error(
            `There's been an error deleting a category @ deleteCategory(categoryId) in ./db/categories.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of all category objects in the categories table
const getAllCategories = async () => {
    try {
        const { rows } = await client.query(`
            SELECT * FROM categories;
        `);

        return rows;
    } catch (error) {
        console.error(
            `There's been an error getting all categories @ getAllCategories() in ./db/categories.js. ${error}`
        );
        throw error;
    }
};

// Returns the category object of the categoryId specified from the categories table if it exists
const getCategoryById = async (categoryId) => {
    try {
        const {
            rows: [category],
        } = await client.query(
            `
            SELECT * FROM categories
            WHERE id=$1
        `,
            [categoryId]
        );

        return category;
    } catch (error) {
        console.error(
            `There's been an error getting a category by id @ getCategoryById(categoryId) in ./db/categories.js. ${error}`
        );
        throw error;
    }
};

// Returns the category object with the specified categoryName from the categories table if it exists
const getCategoryByName = async (categoryName) => {
    try {
        const {
            rows: [category],
        } = await client.query(
            `
            SELECT * FROM categories
            WHERE name=$1
        `,
            [categoryName]
        );

        return category;
    } catch (error) {
        console.error(
            `There's been an error getting a category by name @ getCategoryByName(categoryName) in ./db/categories.js. ${error}`
        );
        throw error;
    }
};

/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    getCategoryByName,
};