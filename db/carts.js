// ./db/carts.js

/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// "userId" INTEGER REFERENCES users(id),
// products INTEGER []

/*------------------------------- Imports and Globals -----------------------------------*/

const client = require("./client");
const {
    addProductToCart,
    removeProductFromCart,
    getProductsByCartId,
} = require("./cart_products");

/*---------------------------------- Functions ---------------------------------------*/

// Add new cart to carts table and return new cart object
const createCart = async ({ userId = NaN, products = [] }) => {
    try {
        //NaN is the only value in JS not equal to istelf, so this will return true only if userId is NaN
        const isNotNum = userId !== userId;

        if (!isNotNum) {
            const {
                rows: [cart],
            } = await client.query(
                `INSERT INTO carts ("userId")
                VALUES($1)
                RETURNING *;
                `,
                [userId]
            );

            if (cart && products.length) {
                products.map(async (productId) => {
                    const {
                        rows: [cartProducts],
                    } = await client.query(
                        `
                        INSERT INTO cart_products ("cartId", "productId")
                        VALUES ($1, $2)
                        RETURNING *;
                    `,
                        [cart.id, productId]
                    );
                });
            }

            return cart;
        } else if (isNotNum || typeof userId !== "number") {
        }
    } catch (error) {
        console.error(
            `There's been an error creating cart @ createCart({userId=Nan, products="{}"}) in ./db/carts.js. ${error}`
        );
        throw error;
    }
};

// Update cart in carts table and return updated cart object
const updateCart = async (id, fields) => {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    if (setString.length === 0) {
        return;
    }
    try {
        const {
            rows: [cart],
        } = await client.query(
            `
            UPDATE carts
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,
            Object.values(fields)
        );

        return cart;
    } catch (error) {
        console.error(
            `There's been an error updating cart @ updateCart(id, fields) in ./db/carts.js. ${error}`
        );
        throw error;
    }
};

// Return cart object associated with specified cartId from carts table
const getCartById = async (cartId) => {
    try {
        const {
            rows: [cart],
        } = await client.query(
            `
            SELECT * FROM carts
            WHERE id=$1;
        `,
            [cartId]
        );

        return cart;
    } catch (error) {
        console.error(
            `There's been an error getting cart by id @ getCartById(cartId) in ./db/carts.js. ${error}`
        );
        throw error;
    }
};

// Delete cart from carts table and return deleted cart object
const deleteCart = async (cartId) => {
    try {
        const isCart = await getCartById(cartId);

        if (isCart) {
            const cartProducts = await getProductsByCartId(cartId);
            const deletedCartProducts = await Promise.all(
                cartProducts.map(
                    async (cartProdObj) =>
                        await removeProductFromCart(cartProdObj.id)
                )
            );

            const {
                rows: [deletedCart],
            } = await client.query(
                `
                DELETE FROM carts
                WHERE id=$1
                RETURNING *
            `,
                [cartId]
            );

            return deletedCart;
        } else {
            throw {
                name: "CartNotFoundError",
                message: "Cannot find cart with that cartId",
            };
        }
    } catch (error) {
        console.error(
            `There's been an error deleting cart @ deleteCart(cartId) in ./db/carts.js. ${error}`
        );
        throw error;
    }
};

// Return cart object associated with specified userId from carts table
const getCartByUserId = async (userId) => {
    try {
        const {
            rows: [cart],
        } = await client.query(
            `
        SELECT * FROM carts
        WHERE "userId"=$1;
        `,
            [userId]
        );

        return cart;
    } catch (error) {
        console.error(
            `There's been an error getting cart by userId @ getCartByUserId(userId) in ./db/carts.js. ${error}`
        );
        throw error;
    }
};

const insertProductToCart = async ({ userId = NaN, products = "{}" }) => {
    try {
        const {
            rows: [cart],
        } = await client.query(
            `
            INSERT INTO carts ("userId", products)
            VALUES($1,$2)
            RETURNING *;
        `,
            [userId, products]
        );

        return cart;
    } catch (error) {
        console.error;
        throw error;
    }
};
/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCartById,
    getCartByUserId,
    insertProductToCart,
};