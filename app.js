require('dotenv').config();
const debug = require('debug')('http');
const express = require("express");
const app = express();
const port = process.env.PORT;
const morgan = require('morgan');
const path = require("path");

// Require
const indexRouter = require("./routes/index.js");
const categoryRouter = require("./routes/categories.js");
const productsRouter = require("./routes/products.js");

// Use & Set
app.use(morgan('tiny'));
app.use("/", express.static("public"));
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'pug');

// Routers
app.use("/", indexRouter);
app.use("/categories/", categoryRouter);
app.use("/products/", productsRouter);

app.listen(port, () => {
    debug(`Example app listening at http://localhost:${port}`);
});