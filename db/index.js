// ./db/index.js

// Requires and exports all db functions
const sync = require("./sync");

module.exports = {
    sync,
    ...require("./users"),
    ...require("./carts"),
    ...require("./categories"),
    ...require("./products"),
    ...require("./reviews"),
    ...require("./shops"),
    ...require("./cart_products"),
    ...require("./category_products"),
    ...require("./product_reviews"),
    ...require("./shop_products"),
};