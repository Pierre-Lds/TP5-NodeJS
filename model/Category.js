const Product = require("./Product.js")
const {MongoClient} = require("mongodb");
const debug = require("debug");
const args = process.argv.slice(2);
const url = args[0] ?? process.env.MONGODB_URI;
const dbName = args[1] ?? process.env.DB_NAME;
const client = new MongoClient(url);

const Category = {

    getById : async function(categoryId){

        let categories = await this.getAll();

        for (let i = 0; i < categories.length; i++) {
            if (categories[i]._id.equals(categoryId)) {
                return categories[i];
            }
        }
        return 0;
    },

    getAll : async function(){

        // Start
        await client.connect();
        debug(`[DBConnect] Connected successfully to MongoDB server: ${url}`);

        // Connections
        const db = client.db(dbName);
        const table = db.collection('categories');

        // Query
        const categories = await table.find().toArray();

        // Nb products
        for (let i = 0; i < categories.length; i++) {
            categories[i].size = await Category.getNbProductsByCategory(categories[i]._id);
        }

        // Show results
        //console.table(categories);
        await client.close();
        return categories;
    },

    getNbProductsByCategory : function(categoryId){
        // Connections
        const db = client.db(dbName);
        const table = db.collection('products');

        // Query
        const results = table.countDocuments(
            { categoryId : categoryId }
        );

        return results;
    },

}

module.exports = Category;
