//  ./routes/carts.js

const express = require("express");
const cartsRouter = express.Router();
const {
    createCart,
    updateCart,
    deleteCart,
    getCartById,
    getCartByUserId,
} = require("../db/carts.js");
const { getProductById } = require("../db/products.js");
const {
    addProductToCart,
    removeProductFromCart,
    getCartProductByCartAndProductId,
    updateCartProducts,
    getProductsByCartId,
} = require("../db/cart_products.js");
const { requireUser } = require("../db/users.js");

cartsRouter.use(async function (req, res, next) {
    console.log("A request has been made to the /api/carts endpoint.");
    next();
});

// Create Cart Route------------------------------WORKS!
cartsRouter.post("/create", async function (req, res, next) {
    const { userId, productId } = req.body;

    const cartData = { userId, productId };

    try {
        const userCart = await getCartByUserId(userId);

        if (userCart) {
            const cartByProductId = await getCartProductByCartAndProductId(
                userCart.id,
                productId
            );

            // If cart already exists, and target product already exists in that cart, increment product in cart
            if (cartByProductId) {
                const cartProductId = cartByProductId.id;
                const currentQuantity = cartByProductId.qtyDesired;

                const updatedQuantity = await updateCartProducts(
                    cartProductId,
                    {
                        qtyDesired: currentQuantity + 1,
                    }
                );

                const updatedProduct = await getProductById(productId);

                res.send({
                    name: "UpdatedProductQuantity",
                    message: "Product quantity has been updated Succesfully",
                    updatedProduct,
                    newQty: updatedQuantity.qtyDesired,
                    cartProductId: updatedQuantity.id,
                });

                // If cart already exists, and target product does not exist in that cart, add product to cart
            } else {
                const cartId = userCart.id;
                const newCartProduct = await addProductToCart(
                    productId,
                    cartId
                );
                const updatedProduct = await getProductById(productId);
                updatedProduct.qtyDesired = 1;

                res.send({
                    name: "CartProductAddedSuccess",
                    message: "Product added to cart",
                    newCartProduct: updatedProduct,
                    cartProductId: newCartProduct.id,
                });
            }

            // If cart does not yet exist, and product therefore does not exist in that cart, create cart and add product to it
        } else {
            const newCart = await createCart({ userId });
            const userNewCart = await getCartByUserId(userId);

            const newCartId = userNewCart.id;
            const newCartProduct = await addProductToCart(productId, newCartId);
            const updatedProduct = await getProductById(productId);
            updatedProduct.qtyDesired = 1;
            if (newCart) {
                res.send({
                    name: "CartCreatedAndProductAdded",
                    message: "Here is your cart with the added product",
                    cart: newCart,
                    newCartProduct: updatedProduct,
                    cartProductId: newCartProduct.id,
                });
            } else {
                throw {
                    message: "Error creating cart",
                };
            }
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//------------------------------Works!
cartsRouter.patch("/update/:cartId", async function (req, res, next) {
    const { cartId } = req.params;
    const { products } = req.body;

    const cartData = {};
    cartData.products = products;

    try {
        const cart = await getCartById(cartId);

        const updatedCart = await updateCart(cart.id, cartData);

        if (updatedCart) {
            res.send({
                message: "Your cart has been updated...",
                cart: updatedCart,
            });
        } else {
            res.send({ message: "Cart update failed." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Delete Cart Route-----Works!
cartsRouter.delete("/deletecart/:cartId", async function (req, res, next) {
    const { cartId } = req.params;

    try {
        const cart = await getCartById(cartId);
        const deletedCart = await deleteCart(cart.id);
        if (deletedCart) {
            res.send({ message: "Cart deleted.", cart: deletedCart });
        } else {
            res.send({ message: "Cart doesnt exist." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Add Product to Cart Route------------------------------Works!
cartsRouter.put("/add/:productId", async function (req, res, next) {
    const { productId } = req.params;
    const { cartId } = req.body;

    try {
        const newCartProduct = await addProductToCart(productId, cartId);
        if (newCartProduct) {
            res.send({
                message: "Product added to cart.",
                product: newCartProduct,
            });
        } else {
            res.send({ message: "Error adding product to cart." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Remove Product From Cart Route-----WORKS!
cartsRouter.delete("/deleteCartProduct/:cartProductId", async function (
    req,
    res,
    next
) {
    const { cartProductId } = req.params;

    try {
        const deletedCartProduct = await removeProductFromCart(cartProductId);
        if (deletedCartProduct) {
            res.send({
                name: "RemoveCartProductSuccess",
                message: "Product removed from cart.",
                product: deletedCartProduct,
            });
        } else {
            res.send({
                name: "RemoveCartProductError",
                message: "Error removing product from cart.",
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Get Cart Products associated with specified cartId
cartsRouter.get("/cartProducts/:cartId", requireUser, async function (
    req,
    res,
    next
) {
    const { cartId } = req.params;

    try {
        const cartProducts = await getProductsByCartId(cartId);

        if (cartProducts && cartProducts.length) {
            const cartProductsArr = [];

            async function getProducts() {
                await Promise.all(
                    cartProducts.map(async (cartProduct) => {
                        const product = await getProductById(
                            cartProduct.productId
                        );
                        //TODO: re-word to qtyDesired when Caleb changes this
                        product.qtyDesired = cartProduct.qtyDesired;
                        product.cartProductId = cartProduct.id;
                        cartProductsArr.push(product);
                    })
                );
            }

            await getProducts();

            if (cartProductsArr && cartProductsArr.length) {
                res.send({
                    name: "CartProductsRetrieved",
                    message:
                        "The products for the cart specified have been found. See attached.",
                    cartProductsArr,
                });
            } else if (!cartProductsArr.length) {
                next({
                    name: "NoProductsFound",
                    message: "No products were found in the cart specified.",
                });
            } else {
                next({
                    name: "ErrorRetrievingCartProducts",
                    message:
                        "There was an error getting the cart products for the specified cart",
                });
            }
        } else {
            next({
                name: "NoProductsFound",
                message: "No products were found in the cart specified.",
            });
        }
    } catch (error) {
        const { name, message } = error;
        next({ name, message });
    }
});

cartsRouter.put("/CartProducts/:CartProductId", async function (
    req,
    res,
    next
) {
    const { qtyDesired } = req.body;
    const cartProductId = req.params.CartProductId;

    try {
        const updatedCartProduct = await updateCartProducts(cartProductId, {
            qtyDesired,
        });
        res.send({
            name: "cartProdQuantityUpdated",
            message: "The quantity of the cart product has been updated.",
            qtyDesired,
        });
    } catch (error) {
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = cartsRouter;