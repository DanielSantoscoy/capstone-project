// ./db/cart_products.js

/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// "cartId" INTEGER REFERENCES carts(id) NOT NULL,
// "productId" INTEGER REFERENCES products(id) NOT NULL

/*------------------------------- Imports and Globals -----------------------------------*/

const client = require("./client");

/*---------------------------------- Functions ---------------------------------------*/

// Adds productId's,cartId's,quantityAvailabe, quantityDesired, and purchasePrice in cart_products table
const addProductToCart = async (productId, cartId) => {
    try {
        const {
            rows: [newCartProduct],
        } = await client.query(
            `
            INSERT INTO cart_products
            ("productId", "cartId")
            VALUES ($1, $2)
            RETURNING *
        `,
            [productId, cartId]
        );

        return newCartProduct;
    } catch (error) {
        console.error(
            `There's been an error adding a product to a cart @ addProductToCart(productId, cartId,totalPrice) in ./db/cart_products.js. ${error}`
        );
        throw error;
    }
};

// Removes productId's from cartId's in cart_products table
const removeProductFromCart = async (cartProductId) => {
    try {
        const isCartProduct = await getCartProductById(cartProductId);
        if (isCartProduct && isCartProduct.length) {
            const {
                rows: [deletedCartProduct],
            } = await client.query(
                `
                DELETE FROM cart_products
                WHERE id=$1
                RETURNING *;
            `,
                [cartProductId]
            );
            return deletedCartProduct;
        } else {
            throw {
                name: "CartProductNotFoundError",
                message: "Cannot find cartProduct with that cartProductId",
            };
        }
    } catch (error) {
        console.error(
            `There's been an error removing a product from a cart @ removeProductFromCart(cartProductId) in ./db/cart_products.js. ${error}`
        );
        throw error;
    }
};

// Returns single cart product object from cart_products table
const getCartProductById = async (cartProductId) => {
    try {
        const { rows: cartProduct } = await client.query(
            `
            SELECT * FROM cart_products
            WHERE id=$1;
        `,
            [cartProductId]
        );

        return cartProduct;
    } catch (error) {
        console.error(
            `There's been an error getting cart product by id @ getCartProductById(cartProductId) in ./db/cart_products.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of product ids for all products associated with the specified cartId
const getProductsByCartId = async (cartId) => {
    try {
        const { rows: cartProducts } = await client.query(
            `
            SELECT * FROM cart_products
            WHERE "cartId"=($1);
        `,
            [cartId]
        );

        return cartProducts;
    } catch (error) {
        console.error(
            `There's been an error getting products by cart id @ getProductsByCartId(cartId) in ./db/cart_products.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of all userProduct objects associated with the specified product id, if any
const getCartProductsByProductId = async (productId) => {
    try {
        const {
            rows: [cartProductsArr],
        } = await client.query(
            `
            SELECT * FROM cart_products
            WHERE "productId"=$1;
        `,
            [productId]
        );

        return cartProductsArr;
    } catch (error) {
        console.error(
            `There's been an error getting cart products by product id @ getCartProductsByProductId(productId) in ./db/cart_products.js. ${error}`
        );
        throw error;
    }
};

const getCartProductByCartAndProductId = async (cartId, productId) => {
    try {
        const {
            rows: [cartProductsArr],
        } = await client.query(
            `
            SELECT * FROM cart_products
            WHERE "productId"=$1
            AND "cartId"=$2
        `,
            [productId, cartId]
        );

        return cartProductsArr;
    } catch (error) {
        console.error(
            `There's been an error getting cart products by product & cart id @ getCartProductsByCartAndProductId(cartId, productId) in ./db/cart_products.js. ${error}`
        );
        throw error;
    }
};

//Updates row in cart_products table and returns updated cart_products object
const updateCartProducts = async (id, fields = {}) => {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    if (setString.length === 0) {
        return;
    }

    try {
        const {
            rows: [cart_products],
        } = await client.query(
            `
          UPDATE cart_products
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `,
            Object.values(fields)
        );

        return cart_products;
    } catch (error) {
        console.error(
            `There's been an error updating the cart_product @ updateCartProducts(id, fields = {}) in ./db/cart_products.js. ${error}`
        );
        throw error;
    }
};
/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    addProductToCart,
    removeProductFromCart,
    getCartProductById,
    getProductsByCartId,
    getCartProductsByProductId,
    getCartProductByCartAndProductId,
    updateCartProducts,
};