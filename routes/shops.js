//  ./routes/shops.js

const express = require("express");
const shopsRouter = express.Router();
const {
    createShop,
    getAllShops,
    getShopById,
    updateShop,
    deleteShop,
} = require("../db/shops.js");

const { getShopProductsByShopId, getProductById } = require("../db");

const { requireUser } = require("../db/users.js");
const shops = require("../db/shops.js");

shopsRouter.use(async function (req, res, next) {
    console.log("A request has been made to the /api/shops endpoint.");
    next();
});

//Get All Shops Route---------------------------------Works!
shopsRouter.get("/", async function (req, res, next) {
    const allShops = await getAllShops();
    if (allShops) {
        res.send({
            message: "Here are all of the available shops.",
            shops: shops,
        });
    }
});

//Create New Shop Route ---------------------------------Works!
shopsRouter.post("/newshop", requireUser, async function (req, res, next) {
    const { userId, name, products, description } = req.body;

    const shopData = {};

    shopData.userId = userId;
    shopData.name = name;
    shopData.products = products;
    shopData.description = description;
    const newShop = createShop(shopData);
    try {
        if (newShop) {
            res.send({ message: "Shop Created!", shop: newShop });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Update Shop Route ---------------------------------Works!
shopsRouter.patch("/update/:shopId", requireUser, async function (
    req,
    res,
    next
) {
    const { shopId } = req.params;
    try {
        const shop = await getShopById(shopId);
        const updatedShop = await updateShop(shopId, shop);

        if (updatedShop) {
            res.send({ message: "Shop has been updated", shop: updatedShop });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Delete Shop Route ---------------------------------Works!
shopsRouter.delete("/delete/:shopId", requireUser, async function (
    req,
    res,
    next
) {
    const { shopId } = req.params;
    try {
        const shop = await getShopById(shopId);

        const deletedShop = await deleteShop(shop.id);
        if (deletedShop) {
            res.send({
                message: "Shop successfully deleted.",
                shop: deletedShop,
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Get Products By ShopID Route---------------------------------Works!
shopsRouter.get("/products/:shopId", async function (req, res, next) {
    const shopId = req.params.shopId;

    try {
        const shopProductIdsArr = await getShopProductsByShopId(shopId);

        if (shopProductIdsArr && shopProductIdsArr.length) {
            const shopProducts = await Promise.all(
                shopProductIdsArr.map(
                    async (shopProductIdObj) =>
                        await getProductById(shopProductIdObj.productId)
                )
            );

            console.log("shopProducts are ", shopProducts);
            res.send({
                name: "shopProductsFound",
                message:
                    "Products for this shop have been found. See attached.",
                shopProducts,
            });
        } else {
            next({
                name: "NoShopProductsFound",
                message: "No products have been found for the specified shop",
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = shopsRouter;