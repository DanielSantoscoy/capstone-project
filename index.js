//  ./index.js

const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const { sync } = require("./db/index");
const PUBLIC_PATH = path.join(__dirname, "./public");

const FORCE = process.env.FORCE || false;
const PORT = process.env.PORT;
const server = express();

const apiRouter = require("./routes");

server.use(express.static(PUBLIC_PATH));
server.use(express.json());
server.use(morgan("dev"));
server.use("/api", apiRouter);

// Start listening to the server, and return a promise
const startServer = new Promise((res) => {
    server.listen(PORT, () => {
        console.log("The server is up on port", PORT);
        res();
    });
});

sync(FORCE).then(startServer).catch(console.error);
// .finally(client.end());