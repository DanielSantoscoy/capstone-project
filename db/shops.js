// ./db/shops.js

/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// "userId" INTEGER REFERENCES users(id) NOT NULL,
// name VARCHAR(255) UNIQUE NOT NULL,
// products INTEGER [],
// description TEXT

/*------------------------------- Imports and Globals -----------------------------------*/

const client = require("./client");

/*---------------------------------- Functions ---------------------------------------*/

// Creates a new shop in the shops table, and returns the new shop object
const createShop = async ({ userId, name, products = "{}", description }) => {
    try {
        const {
            rows: [shop],
        } = await client.query(
            `
        INSERT INTO shops ("userId", name, products, description)
        VALUES($1,$2,$3,$4)
        RETURNING *;
        `,
            [userId, name, products, description]
        );

        return shop;
    } catch (error) {
        console.error(
            `There's been an error creating a new shop @ createShop({userId, name, products={}, description}) in ./db/shops.js. ${error}`
        );
        throw error;
    }
};

// Updates a shop in the shops table, and returns the updated shop object
const updateShop = async (id, fields = {}) => {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    if (setString.length === 0) {
        return;
    }

    try {
        const {
            rows: [updatedShop],
        } = await client.query(
            `
          UPDATE shops
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `,
            Object.values(fields)
        );

        return updatedShop;
    } catch (error) {
        console.error(
            `There's been an error updating a shop @ updateShop(id, fields={}) in ./db/shops.js. ${error}`
        );
        throw error;
    }
};

// Deletes a shop from the shops table, and returns the deleted shop object
const deleteShop = async (shopId) => {
    try {
        const {
            rows: [deletedShop],
        } = await client.query(
            `
            DELETE FROM shops
            WHERE id=$1
            RETURNING *
        `,
            [shopId]
        );

        return deletedShop;
    } catch (error) {
        console.error(
            `There's been an error deleting a shop @ deleteShop(shopId) in ./db/shops.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of all shop objects in the shops table
const getAllShops = async () => {
    try {
        const { rows } = await client.query(`SELECT * FROM shops;`);

        return rows;
    } catch (error) {
        console.error(
            `There's been an error getting all shops @ getAllShops() in ./db/shops.js. ${error}`
        );
        throw error;
    }
};

// Returns the shop object of the shop with the specified shopId in the shops table if it exists
const getShopById = async (shopId) => {
    try {
        const {
            rows: [shop],
        } = await client.query(
            `SELECT * FROM shops
            WHERE id=$1;`,
            [shopId]
        );

        if (!shop) {
            throw {
                name: "NoShopFoundError",
                message: "Cannot find shop by that shop Id",
            };
        }

        return shop;
    } catch (error) {
        console.error(
            `There's been an error getting a shop by id @ getShopById(shopId) in ./db/shops.js. ${error}`
        );
        throw error;
    }
};

// Returns the shop object of the shop belonging to the user with the specified userId from the shops table if it exists
const getShopByUserId = async (userId) => {
    console.log(userId);
    try {
        const {
            rows: [shop],
        } = await client.query(
            `SELECT * FROM shops
            WHERE "userId"=$1;`,
            [userId]
        );
        if (shop) {
            return shop;
        }
    } catch (error) {
        console.error(
            `There's been an error getting a shop by userId @ getShopByUserId(userId) in ./db/shops.js. ${error}`
        );
        throw error;
    }
};

/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    createShop,
    updateShop,
    deleteShop,
    getAllShops,
    getShopById,
    getShopByUserId,
};