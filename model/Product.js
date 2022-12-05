const {MongoClient} = require("mongodb");
const debug = require("debug");
const args = process.argv.slice(2);
const url = args[0] ?? process.env.MONGODB_URI;
const dbName = args[1] ?? process.env.DB_NAME;
const client = new MongoClient(url);

const Product = {

    getByCategory : async function(categoryId) {

        let products = await this.getAll();
        let productsFinal = [];

        for (let i = 0; i < products.length; i++) {
            if (products[i].categoryId.equals(categoryId)) {
                productsFinal.push(products[i]);
            }
        }
        return productsFinal;
    },

    getById : async function(productId) {

        let products = await this.getAll();

        for (let i = 0; i < products.length; i++) {
            if (products[i]._id.equals(productId)) {
                return products[i];
            }
        }
        return 0;

        return this.getAll().filter(product => product._id === productId)[0];
    },

    getAll : async function() {

        // Start
        await client.connect();
        debug(`[DBConnect] Connected successfully to MongoDB server: ${url}`);

        // Connections
        const db = client.db(dbName);
        const table = db.collection('products');

        // Query
        const products = await table.find().toArray();

        // Results
        await client.close();
        return products;

   }

}

module.exports = Product;
