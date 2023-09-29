// ./db/seed.js

/*------------------------------- Imports and Globals -----------------------------------*/

const bcrypt = require("bcrypt");
const chalk = require("chalk");
const client = require("./client");
const {
    createUser,
    createProduct,
    createReview,
    createCart,
    createShop,
    createCategory,
    getUserById,
    getUserByUserName,
    getAllUsers,
    updateUser,
    deleteUser,
    deleteCart,
    getCartByUserId,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    getAllProducts,
    getProductById,
    getProductByName,
    updateProduct,
    deleteProduct,
    updateShop,
    deleteShop,
    getAllShops,
    getShopById,
    getShopByUserId,
    deleteReview,
    updateReview,
    getReviewsByProductId,
    getReviewsByUserId,
    addProductToCart,
    removeProductFromCart,
    getCartProductById,
    getProductsByCartId,
    addCategoryToProduct,
    removeCategoryFromProduct,
    deactivateProduct,
    deactivateUser,
} = require("./index");

/*---------------------------------- Functions ---------------------------------------*/

//Tests functionality of database functions
async function testDB() {
    try {
        console.log(chalk.yellow("Start db testing..."));

        // Users table functions
        console.log(chalk.cyan("Testing Users table functions"));

        console.log(chalk.magenta("Testing updateUser..."));
        const updatedUser = await updateUser(1, {
            email: "tony.dyleuth@anotherexample.com",
            shopName: "The Tonynator",
            public: false,
        });
        console.log(chalk.green("updateUser result: "), updatedUser);

        console.log(chalk.magenta("Testing deactivateUser..."));
        const deactivatedUser = await deactivateUser(4);
        console.log(chalk.green("deactiveUser result: "), deactivatedUser);

        console.log(chalk.magenta("Testing deleteUser..."));
        const deletedUser = await deleteUser(4);
        console.log(chalk.green("deleteUser result: "), deletedUser);

        console.log(chalk.magenta("Testing getAllUsers..."));
        const allUsers = await getAllUsers();
        console.log(chalk.green("getAllUsersResult: "), allUsers);

        console.log(chalk.magenta("Testing getUserById... "));
        const userById = await getUserById(3);
        console.log(chalk.green("getUserById result: "), userById);

        console.log(chalk.magenta("Testing getUserByUserName"));
        const userByUsername = await getUserByUserName("caleb_rocks");
        console.log(chalk.green("getUserByUserName result: "), userByUsername);

        // Products table functions
        console.log(chalk.cyan("Testing Products table functions"));

        console.log(chalk.magenta("Testing getAllProducts)"));
        const allProducts = await getAllProducts();
        console.log(chalk.green("getAllProducts results"), allProducts);

        console.log("Testing getProductsById");
        const getProductByIdResults = await getProductById(4);
        console.log("GetProductById result", getProductByIdResults);

        console.log("Testing getProductsByName");
        const getProductByNameResults = await getProductByName("Pet Rock");
        console.log("GetProductByName result", getProductByNameResults);

        console.log("Testing updateProduct");
        const updateProductResult = await updateProduct(1, {
            name: "Human Rock",
            description: "A human rock",
        });
        console.log("updateProduct result", updateProductResult);

        console.log("Testing deactivateProduct");
        const deactivateProductResult = await deactivateProduct(1);
        console.log("deactivateProduct result", deactivateProductResult);

        console.log("Testing deleteProduct");
        const deletedProduct = await deleteProduct(1);
        console.log("deletedProduct is ", deletedProduct);

        console.log("Testing getProductsByUserId");
        const geAllProductsByUserIdResults = await getProductsByUserId(3);
        console.log("getProductsByUserId result", geAllProductsByUserIdResults);

        // Cart table functions
        console.log("Testing Carts table functions");

        //COLUMN PRODUCTS DOESNT EXIST

        console.log("Testing deleteCart...");
        const deletedCart = await deleteCart(1);
        console.log("deleteCart result: ", deletedCart);

        console.log("Testing getCartByUserId...");
        const userCart = await getCartByUserId(2);
        console.log("getCartByUserId result: ", userCart);

        // Categories table functions
        console.log(chalk.cyan("Testing Categories table functions"));

        console.log("Testing updateCategory...");
        const updatedCategory = await updateCategory(2, { name: "Fun" });
        console.log("updateCategory result: ", updatedCategory);

        //FOREIGN KEY VIOLATION CATEGORY PRODUCTS

        console.log("Testing deleteCategory...");
        const deletedCategory = await deleteCategory(2);
        console.log("deleteCategory result is ", deletedCategory);

        console.log("Testing getAllCategories...");
        const allCategories = await getAllCategories();
        console.log("getAllCategories result is ", allCategories);

        console.log("Testing getCategoryById...");
        const categoryById = await getCategoryById(1);
        console.log("getCategoryById result is ", categoryById);

        console.log("Testing getCategoryByName");
        const categoryByName = await getCategoryByName("music");
        console.log("getCategoryByName result is ", categoryByName);

        // Shops table functions
        console.log(chalk.cyan("Testing Shops table functions"));

        console.log("Testing updateShop");
        const updatedShopResult = await updateShop(1, {
            userId: 3,
            name: "Caleb's Shop",
            products: "{4}",
        });
        console.log("updateShop Result", updatedShopResult);

        console.log("Testing DeleteShop");
        const deleteShopresult = await deleteShop(2);
        console.log("DeleteShop Result ", deleteShopresult);

        console.log("Testing getAllShops");
        const getAllShopresult = await getAllShops();
        console.log("AllShop Result ", getAllShopresult);

        console.log("Testing getShopById...");
        const getShopByIdResult = await getShopById(1);
        console.log("getShopById result: ", getShopByIdResult);

        console.log("Testing getShopByUserId...");
        const getShopByUserIdResult = await getShopByUserId(3);
        console.log("getShopByUserId result: ", getShopByUserIdResult);

        // Reviews table functions
        console.log(chalk.cyan("Testing Reviews table functions"));

        console.log("Testing deleteReview...");
        const deletedReview = await deleteReview(3);
        console.log("deleteReview result: ", deletedReview);

        console.log("Testing getReviewsByProductId...");
        const reviewByProdId = await getReviewsByProductId(3);
        console.log("getReviewsByProductId result: ", reviewByProdId);

        console.log("Testing getReviewsByUserId...");
        const reviewByUserId = await getReviewsByUserId(2);
        console.log("getReviewsByUserId result: ", reviewByUserId);

        console.log("Testing updateReview...");
        const updatedReview = await updateReview(4, {
            title: "This rock ROCKS YOUR SOCKS OFF OKAY!!!!",
            comment:
                "I purchased this rock a week ago and was completely blown away. Not only does it actually rock, this rock also totally ROCKS!!! EDIT: It's been two months now and let me tell you, this rock has literally changed my life. Everything is amazing. If you haven't gotten one yet, you're missing out.",
        });
        console.log("updateReview result:", updatedReview);

        // Cart_products table functions
        console.log(chalk.cyan("Testing Cart_products table functions"));

        //COLUMN PRICETOTAL OF CART PRODUCTS RELATION DOESNT EXIST

        console.log("Testing addProductToCart...");
        const addedCartProduct = await addProductToCart(1, 2);
        console.log("addProductToCart result: ", addedCartProduct);

        console.log("Testing getCartProductById...");
        const cartByProdId = await getCartProductById(6);
        console.log("getCartProductById result: ", cartByProdId);

        console.log("Testing getProductsByCartId...");
        const productsByCartId = await getProductsByCartId(2);
        console.log("getProductsByCartId result: ", productsByCartId);

        console.log("Testing removeProductFromCart...");
        const removedCartProduct = await removeProductFromCart(6);
        console.log("removeProductFromCart result: ", removedCartProduct);

        // Category_products table functions
        console.log(chalk.cyan("Testing category_products table functions"));

        console.log("Testing addCategoryToProduct...");
        const prodCategory = await addCategoryToProduct(3, 3);
        console.log("addCategoryToProduct result: ", prodCategory);

        console.log("Testing removeCategoryFromProduct...");
        const deletedProdCategory = await removeCategoryFromProduct(4);
        console.log("removeCategoryFromProduct result: ", deletedProdCategory);

        // User_product table functions
        console.log(chalk.cyan("Testing user_products table functions..."));

        console.log(chalk.magenta("Testing addProductToUser"));
        const userProduct = await addProductToUser(3, 1);
        console.log(chalk.green("addProductToUser result: "), userProduct);

        console.log(chalk.magenta("Testing deleteProductFromUser"));
        const removedUserProd = await deleteProductFromUser(4);
        console.log(
            chalk.green("deleteProductFromUser result: "),
            removedUserProd
        );

        console.log(chalk.greenBright("Finished db testing"));
    } catch (error) {
        console.error(
            "Error testing db functions @ ./db/seed.js testDB()! Error: "
        );
        throw error;
    }
}

//Create all tables if they do not already exist
async function createTables() {
    console.log(chalk.yellow("Starting to create tables..."));
    try {
        //TODO: Add image array
        //Users table
        await client.query(
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                "firstName" VARCHAR(255) NOT NULL,
                "lastName" VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                role varchar NOT NULL,
                addresses TEXT [],
                "paymentInfo" TEXT [],
                "shopName" VARCHAR (255),
                public BOOLEAN DEFAULT false,
                active BOOLEAN DEFAULT true
            );`
        );

        //TODO: Add media array
        //Shops table
        await client.query(`
            CREATE TABLE IF NOT EXISTS shops(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                name VARCHAR(255) UNIQUE NOT NULL,
                products INTEGER [],
                description TEXT
            );`);

        //TODO: Add image array
        //Products table
        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price FLOAT(2) NOT NULL,
                "qtyAvailable" INTEGER NOT NULL,
                delivery TEXT [],
                rating FLOAT(1),
                "shopId" INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
                "categoryId" INTEGER [],
                active BOOLEAN DEFAULT true,
                image text
            );`);

        //shop_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS shop_products (
                id SERIAL PRIMARY KEY,
                "shopId" INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
                "productId" INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE
            );`);

        //Categories table
        await client.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(25) UNIQUE NOT NULL
            );`);

        //Category_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS category_products(
                id SERIAL PRIMARY KEY,
                "categoryId" INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
                "productId" INTEGER  NOT NULL REFERENCES products(id) ON DELETE CASCADE
            );`);

        //TODO: Add media array
        //Reviews table
        await client.query(`
            CREATE TABLE IF NOT EXISTS reviews(
                id SERIAL PRIMARY KEY,
                "productId" INTEGER  NOT NULL REFERENCES products(id) ON DELETE CASCADE,
                "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(255),
                rating INTEGER NOT NULL,
                comment TEXT NOT NULL
            );`);

        //Carts table (userId not required for non-users to be able to purchase)
        await client.query(`
            CREATE TABLE IF NOT EXISTS carts(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE
            );`);

        //Cart_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS cart_products(
                id SERIAL PRIMARY KEY,
                "cartId" INTEGER NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
                "productId" INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
                 "qtyDesired" INTEGER DEFAULT '1',
                 UNIQUE ("cartId","productId")
            
            );`);

        //Receipts table
        await client.query(`
            CREATE TABLE IF NOT EXISTS receipts(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                products INTEGER [] NOT NULL,
                "orderDate" DATE NOT NULL,
                "orderTotal" FLOAT(2) NOT NULL,
                shippingAddress VARCHAR(255) NOT NULL,
                payment text [] NOT NULL
            );`);

        //Support_messages table
        await client.query(`
            CREATE TABLE IF NOT EXISTS support_messages(
                id SERIAL PRIMARY KEY,
                "customerUserId" INTEGER  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                "merchantUserId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                "productId" INTEGER REFERENCES products(id) ON DELETE CASCADE,
                "storeId" INTEGER REFERENCES shops(id) ON DELETE CASCADE,
                messages TEXT [] NOT NULL
            );`);

        //User_support_messages join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_support_messages(
                id SERIAL PRIMARY KEY,
                "customerUserId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                "merchantUserId" INTEGER  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                "interactionId" INTEGER  NOT NULL REFERENCES support_messages(id) ON DELETE CASCADE
            );`);

        //TODO: Add media array and figure out if there's a way to make one of three fields required
        //Posts table
        await client.query(`
            CREATE TABLE IF NOT EXISTS posts(
                id SERIAL PRIMARY KEY,
                title VARCHAR(50),
                "postBody" TEXT,
                comments INTEGER []
            );`);

        //User_posts join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_posts(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                "postId" INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE
            );`);

        //Comments table
        await client.query(`
            CREATE TABLE IF NOT EXISTS comments(
                id SERIAL PRIMARY KEY,
                "postsId" INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
                comment TEXT NOT NULL
            );`);

        console.log(chalk.greenBright("Finished creating tables!"));
    } catch (error) {
        console.error(
            "Error creating tables @ db/seed.js createTables()! Error: ",
            error
        );
        throw error;
    }
}

//Drops all tables if they exist
async function dropTables() {
    try {
        console.log(chalk.yellow("Starting to drop tables..."));

        await client.query(`
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS user_posts;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS user_support_messages;
        DROP TABLE IF EXISTS support_messages;
        DROP TABLE IF EXISTS receipts;
        DROP TABLE IF EXISTS product_reviews;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS cart_products;
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS category_products;
        DROP TABLE IF EXISTS categories;
        DROP TABLE IF EXISTS shop_products;
        Drop TABLE IF EXISTS user_products;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS shops;
        DROP TABLE IF EXISTS users;
        `);

        console.log(chalk.greenBright("Finished dropping tables!"));
    } catch (error) {
        console.error("Error dropping tables @ db/seed.js! Error: ", error);
        throw error;
    }
}

//Creates seed data of initial users
async function createInitialUsers() {
    // Reference
    //     id SERIAL PRIMARY KEY,
    //     username VARCHAR(25) UNIQUE NOT NULL,
    //     password VARCHAR(25) NOT NULL,
    //     "firstName" VARCHAR(25) NOT NULL,
    //     "lastName" VARCHAR(25) NOT NULL,
    //     email VARCHAR(255) UNIQUE NOT NULL,
    //     role varchar NOT NULL,
    //     addresses TEXT [],
    //     "paymentInfo" TEXT [],
    //     "shopName" VARCHAR (50),
    //     public BOOLEAN DEFAULT false,
    //     active BOOLEAN DEFAULT true

    console.log(chalk.yellow("Creating initial users..."));

    const SALT_COUNT = 10;

    try {
        const tony = await createUser({
            username: "tdyleuth",
            password: await bcrypt.hash("password123", SALT_COUNT),
            firstName: "Tony",
            lastName: "Dyleuth",
            email: "tony.dyleuth@example.com",
            role: "admin",
            addresses: "{}",
            paymentInfo: "{}",
            shopName: "",
            public: true,
            active: true,
        });

        const nahid = await createUser({
            username: "nahid_alami",
            password: await bcrypt.hash("password234", SALT_COUNT),
            firstName: "Nahid",
            lastName: "Alami",
            email: "nahidalami@example.com",
            role: "merchant",
            addresses: "{}",
            paymentInfo: "{}",
            shopName: "",
            public: true,
            active: true,
        });

        const caleb = await createUser({
            username: "caleb_rocks",
            password: await bcrypt.hash("password345", SALT_COUNT),
            firstName: "Caleb",
            lastName: "Henderson",
            email: "caleb_rocks@example.com",
            role: "user",
            addresses: "{}",
            paymentInfo: "{}",
            shopName: "Caleb's Rocks",
            public: true,
            active: true,
        });

        const yahya = await createUser({
            username: "yhafez",
            password: await bcrypt.hash("password212", SALT_COUNT),
            firstName: "Yahya",
            lastName: "Hafez",
            email: "yhafez3@example.com",
            role: "user",
            addresses: "{}",
            paymentInfo: "{}",
            shopName: "",
            public: false,
            active: true,
        });

        console.log(chalk.greenBright("Finished creating initial users!"));
    } catch (error) {
        console.error(
            "Error creating initial users @ db/seed.js createInitialUsers()! Error: ",
            error
        );
        throw error;
    }
}
//Creates seed data of initial categories
async function createInitialCategories() {
    // Reference
    // id SERIAL PRIMARY KEY,
    // name VARCHAR(25) UNIQUE NOT NULL

    console.log(chalk.yellow("Creating initial categories..."));

    const clothing = await createCategory({ name: "clothing" });

    const recreation = await createCategory({ name: "recreation" });

    const electronics = await createCategory({ name: "electronics" });

    const music = await createCategory({ name: "music" });

    const education = await createCategory({ name: "education" });

    const crystals = await createCategory({ name: "crystals" });

    const services = await createCategory({ name: "services" });

    try {
        console.log(chalk.greenBright("Finished creating initial categories!"));
    } catch (error) {
        console.error(
            "Error creating initial categories @ db/seed.js createInitialCategories()! Error: ",
            error
        );
        throw error;
    }
}

//Creates seed data of initial shops
async function createInitialShops() {
    // Reference
    // id SERIAL PRIMARY KEY,
    // "userId" INTEGER REFERENCES users(id) NOT NULL,
    // name VARCHAR(255) UNIQUE NOT NULL,
    // products INTEGER [],
    // description TEXT

    console.log(chalk.yellow("Creating initial shops..."));

    try {
        const third = await createShop({
            userId: 1,
            name: "3rd",
            products: "{10, 11, 12, 13}",
            description: "The go to online shop for all your occult needs",
        });

        const eye = await createShop({
            userId: 1,
            name: "Eye",
            products: "{14, 15, 16, 17}",
            description: "The go to online shop for all your occult needs",
        });

        const craft = await createShop({
            userId: 1,
            name: "Crafts",
            products:
                "{18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39}",
            description: "The go to online shop for all your occult needs",
        });

        const calebsRocks = await createShop({
            userId: 3,
            name: "Caleb's Rocks",
            products: "{1}",
            description:
                "The finest rocks in the industry, but also the finest rocking tunes in that industry too",
        });

        const lamasatyFashion = await createShop({
            userId: 2,
            name: "Lamasaty Fashion",
            products: "{3}",
            description: "An Arabic and Islamic clothing and accessory store",
        });

        const djHub = await createShop({
            userId: 4,
            name: "DJ Hub",
            products: "{2}",
            description:
                "The one-stop shop for all your DJ'ing needs. And when I say all, I really mean ALL!",
        });

        console.log(chalk.greenBright("Finished creating initial shops!"));
    } catch (error) {
        console.error(
            "Error creating initial shops @ db/seed.js createInitialShops()! Error: ",
            error
        );
        throw error;
    }
}

//Creates seed data of initial users
async function createInitialProducts() {
    // Reference
    //     id SERIAL PRIMARY KEY,
    //     name VARCHAR(255) NOT NULL,
    //     description TEXT NOT NULL,
    //     price FLOAT(2) NOT NULL,
    //     qtyAvailable INTEGER NOT NULL,
    //     delivery TEXT [],
    //     rating FLOAT(1),
    //     "shopId" INTEGER REFERENCES shops(id) NOT NULL,
    //     "categoryId" INTEGER []

    console.log(chalk.yellow("Creating initial products..."));

    try {
        const rock = await createProduct({
            name: "Pet Rock",
            description:
                "A friendly rock found in Joshua Tree looking for a home",
            price: 300.99,
            qtyAvailable: 1,
            delivery: '{"pickup"}',
            rating: 5.0,
            shopId: 4,
            categoryId: "{2, 3}",
        });

        const turnTable = await createProduct({
            name: "Turntables",
            description:
                "A pair of used Pioneer CDJ's in decent condition, perfect for getting your scratch on!",
            price: 450.99,
            qtyAvailable: 2,
            delivery: '{"standard", "express", "next-day"}',
            rating: 3.5,
            shopId: 4,
            categoryId: "{4}",
        });

        const dress = await createProduct({
            name: "Embroidered Dress",
            description:
                "One of a kind, hand-made embroidered dress from Egypt, perfect for weddings, parties, and other special occassions!",
            price: 60.0,
            qtyAvailable: 50,
            delivery: '{"standard"}',
            rating: 5.0,
            shopId: 4,
            categoryId: "{1}",
        });

        const course = await createProduct({
            name: "Fullstack Software Development Course",
            description:
                "A part-time course offered by the incredible Fullstack Academy of Code to get you coding in your dream job in 6-months",
            price: "11000.00",
            qtyAvailable: 999,
            delivery: '{"electronic"}',
            rating: 5.0,
            shopId: 4,
            categoryId: "{5}",
        });

        const course2 = await createProduct({
            name: "Java for Dummies Course",
            description: "A Java course offered to beginners of all ages",
            price: "99.00",
            qtyAvailable: 100,
            delivery: '{"electronic"}',
            rating: 3,
            shopId: 4,
            categoryId: "{5}",
        });

        const course3 = await createProduct({
            name: "Mobile Dev for Dummies Course",
            description:
                "A Mobile development course offered to beginners of all ages",
            price: "35.00",
            qtyAvailable: 100,
            delivery: '{"electronic"}',
            rating: 4.0,
            shopId: 4,
            categoryId: "{5}",
        });

        const course4 = await createProduct({
            name: "Passive Income Ideas",
            description:
                "A course that teaches different ways to make passive income",
            price: "25.00",
            qtyAvailable: 40,
            delivery: '{"electronic"}',
            rating: 2.0,
            shopId: 4,
            categoryId: "{5}",
        });

        const course5 = await createProduct({
            name: "Entrepenuer Crash Course",
            description: "Learn to become an entrepenuer step by step",
            price: "65.00",
            qtyAvailable: 100,
            delivery: '{"electronic"}',
            rating: 4.0,
            shopId: 4,
            categoryId: "{5}",
        });

        const course6 = await createProduct({
            name: "Become a Chef",
            description:
                "Learn to become chef as little as 1 day with this course ",
            price: "100.00",
            qtyAvailable: 100,
            delivery: '{"electronic"}',
            rating: 3.0,
            shopId: 4,
            categoryId: "{5}",
        });

        const astrology1 = await createProduct({
            name: "Star Chart Reading (30 minutes)",
            description:
                "An reading of the main planetary placements of your birth chart",
            price: "30.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 1,
            categoryId: "{7}",
            image: "/assets/astrology_4.png",
        });

        const astrology2 = await createProduct({
            name: "Star Chart Reading (1hr)",
            description:
                "An comprehensive reading of the all the planetary placements in your birth chart",
            price: "50.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 1,
            categoryId: "{7}",
            image: "/assets/astrology_1.jpg",
        });

        const astrology3 = await createProduct({
            name: "Star Chart Reading (1.5hr)",
            description:
                "An comprehensive reading of the planetary placements in your birth chart and the placement of your 12 planetart houses",
            price: "70.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 1,
            categoryId: "{7}",
            image: "/assets/astrology_2.png",
        });

        const astrology4 = await createProduct({
            name: "Star Chart Reading (2hr)",
            description:
                "An comprehensive reading of  your planetary placements, house placements, and the relations (aspects) between them. Our most comprehensive package!",
            price: "90.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 1,
            categoryId: "{7}",
            image: "/assets/astrology_3.png",
        });

        const tarot1 = await createProduct({
            name: "Tarot Reading (1 card spread)",
            description:
                "Have one burning question you'd like insight on? Our one card spread package is perfect!",
            price: "20.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 2,
            categoryId: "{7}",
            image: "/assets/tarot_4.png",
        });

        const tarot2 = await createProduct({
            name: "Tarot Reading (3 card spread)",
            description:
                "Looking for deeper insight on a matter in your life? The 3 card spread will tell you the main factors influencing the matter as well as the dynamics of its past, present, and future",
            price: "35.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 2,
            categoryId: "{7}",
            image: "/assets/tarot_1.png",
        });

        const tarot3 = await createProduct({
            name: "Tarot Reading (5 card spread)",
            description:
                "The 5 card spread is for those looking for deep clarity on an issue they are dealing with. This reading informs you of the major and minor influences contributing to the matter, the temporal context of the issue, and the ways you can take control of your destiny",
            price: "55.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 2,
            categoryId: "{7}",
            image: "/assets/tarot_2.png",
        });

        const tarot4 = await createProduct({
            name: "Tarot Reading (10 card spread)",
            description:
                "Not for the faint-of-heart! Our 10 card spread is a deeply intuitive reading that can provide insight both about an external matter, as well as introspective qualities that you may not even be tuned into",
            price: "67.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 2,
            categoryId: "{7}",
            image: "/assets/tarot_3.png",
        });

        const cystal2 = await createProduct({
            name: "Purple Amethyst",
            description: "Purple Amethyst crystals from the third dimension",
            price: "33.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/amethyst_3.png",
        });

        const cystal5 = await createProduct({
            name: "Bismuth",
            description:
                "Locally sourced authentic Glowing Amethyst to help soothe your energies",
            price: "30.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/bismuth_3.png",
        });

        const cystal6 = await createProduct({
            name: "Blue Quartz",
            description:
                "A blue quartz crystal from the sea cavarns of Atlantis",
            price: "17.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/blue_quartz.png",
        });

        const cystal8 = await createProduct({
            name: "Cavansite",
            description:
                "An ancienct cavansite stone to channel the deep energies of the unknown",
            price: "130.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/cavansite.png",
        });

        const cystal10 = await createProduct({
            name: "White Diamond",
            description:
                "A pure diamond, ethically sourced diamond. So pretty!",
            price: "1000.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/diamond.png",
        });

        const cystal12 = await createProduct({
            name: "Holographic Quartz",
            description:
                "Some say staring into this crystal will cause visual halucinations",
            price: "107.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/holographic_quartz.png",
        });

        const cystal13 = await createProduct({
            name: "Moonstone",
            description: "This crystal is beyond this world!",
            price: "60.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/moonstone.png",
        });

        const cystal15 = await createProduct({
            name: "Amethyst",
            description:
                "Locally sourced authentic Glowing Amethyst to help soothe your energies",
            price: "10.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/purple_crystal.png",
        });

        const cystal16 = await createProduct({
            name: "Icestone",
            description:
                "Only found in the depths of the icy tundra, this crysal is one of a kind!",
            price: "70.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/quartz.png",
        });

        const cystal17 = await createProduct({
            name: "Saphire",
            description: "A crystal that's almost as beautiful as you are ;)",
            price: "100.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/quartz_2.png",
        });

        const cystal3 = await createProduct({
            name: "Bismuth",
            description:
                "This rainbow colored crystal contains every color of the spectrum and beyond",
            price: "30.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/bismuth.png",
        });

        const cystal18 = await createProduct({
            name: "Josephite",
            description:
                "Many a prophecy have been enscribed in reference to this sacred crystal",
            price: "300.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/rose_quartz.png",
        });

        const cystal19 = await createProduct({
            name: "Rose Quartz",
            description: "A rosy crystal filled with romantic energy",
            price: "28.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/rose_quartz_2.png",
        });

        const cystal20 = await createProduct({
            name: "Rainbow Quartz",
            description: "The most colorful crystal in the quartz family",
            price: "400.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/rainbow_quartz.png",
        });

        const cystal21 = await createProduct({
            name: "Ruby",
            description: "A fiery stone for a fiery personality",
            price: "300.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/ruby.png",
        });

        const cystal22 = await createProduct({
            name: "Oceanite",
            description:
                "From the deepest trenches of the sea, a stone that knows no equivalent",
            price: "250.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/saphire.png",
        });

        const cystal23 = await createProduct({
            name: "Smoky Quartz",
            description:
                "Bright and dark at the same time, smoky quartz is a rare find for the avid collector",
            price: "50.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/smoky_quartz.png",
        });
        const cystal1 = await createProduct({
            name: "Glowing Amethyst",
            description:
                "When regular amethysts just don't cut it, glowing amethysts are the way to go",
            price: "40.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/amethyst.png",
        });

        const cystal14 = await createProduct({
            name: "Morganite",
            description:
                "We don't know who this Morgan is, but he sure does have a sweet crysal named after him",
            price: "15.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/morganite.png",
        });

        const cystal4 = await createProduct({
            name: "Bismuth",
            description:
                "The classic bismuth structure, with it's interlaced quadratic patterns makes its appearance",
            price: "30.00",
            qtyAvailable: 100,
            delivery: '{"ground"}',
            rating: 5.0,
            shopId: 3,
            categoryId: "{6}",
            image: "/assets/bismuth_2.png",
        });

        console.log(chalk.greenBright("Finished creating initial products!"));
    } catch (error) {
        console.error(
            "Error creating initial products @ db/seed.js createInitialProducts()! Error: ",
            error
        );
        throw error;
    }
}

//Create seed data of initial reviews
async function createInitialReviews() {
    //Reference
    // id SERIAL PRIMARY KEY,
    // "productId" INTEGER REFERENCES products(id) NOT NULL,
    // "userId" INTEGER REFERENCES users(id) NOT NULL,
    // title VARCHAR(255),
    // rating INTEGER NOT NULL,
    // comment TEXT NOT NULL

    console.log(chalk.yellow("Creating initial reviews..."));

    try {
        const satisfied = await createReview({
            productId: 1,
            userId: 4,
            title: "This rock ROCKS",
            rating: 5,
            comment:
                "I purchased this rock a week ago and was completely blown away. Not only does it actually rock, this rock also totally ROCKS!!!",
        });

        const angry = await createReview({
            productId: 2,
            userId: 2,
            title: "Janky turntables, 10/10 don't reccomend",
            rating: 1,
            comment:
                "I purchased these turtables expecting them to at the very least work. Imagine my fury when I instead received a cardboard cut out of a turntable. Absolutely ridiculous, I demand my money back",
        });

        const confused = await createReview({
            productId: 4,
            userId: 1,
            title: "Am I too good of a coder?",
            rating: 3,
            comment:
                "I had really high expectations of Fullstack, but this was just a whole nother level. I'm almost in disbelief at how hirable I am.",
        });

        const ecstatic = await createReview({
            productId: 3,
            userId: 3,
            title: "",
            rating: 5,
            comment:
                "I'm in absolute love with this dress, it's exactly what my wife and I were looking for! Thanks Lamasaty fashion!!!",
        });

        console.log(chalk.greenBright("Finished creating initial reviews!"));
    } catch (error) {
        console.error(
            "Error creating initial reviews @ db/seed.js createInitialReviews()! Error: ",
            error
        );
        throw error;
    }
}
//Creates seed data of initial carts
async function createInitialCarts() {
    // Reference
    // id SERIAL PRIMARY KEY,
    // "userId" INTEGER REFERENCES user(id),
    // products INTEGER []

    console.log(chalk.yellow("Creating initial carts..."));

    try {
        const tonysCart = await createCart({
            userId: 1,
        });

        const nahidsCart = await createCart({
            userId: 2,
            products: [],
        });

        const calebsCart = await createCart({
            userId: 3,
            products: [3, 2],
        });

        const yahyasCart = await createCart({
            userId: 4,
            products: [21, 14, 32],
        });

        const anonsCart = await createCart({
            products: [1, 2, 4],
        });

        console.log(chalk.greenBright("Finished creating initial carts!"));
    } catch (error) {
        console.error(
            "Error creating initial carts @ db/seed.js at createInitialCarts()! Error: ",
            error
        );
        throw error;
    }
}

//Connects to client, then drops and rebuilds all tables with initial seed data
async function bootstrap() {
    try {
        console.log(chalk.blue("Connected to DB!"));

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialShops();
        await createInitialCategories();
        await createInitialProducts();
        await createInitialCarts();
        await createInitialReviews();

        console.log(chalk.blue("Finished seeding!"));
    } catch (error) {
        console.error(
            "Error bootstrapping in ./db/seed.js at bootstrap(). Error: ",
            error
        );
        throw error;
    }
}
/*---------------------------------- Run-Time ---------------------------------------*/

bootstrap()
    // .then(testDB)
    .catch(console.error)
    .finally(() => client.end());