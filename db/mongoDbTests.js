const { MongoClient } = require('mongodb');
const debug = require("debug");

const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://localhost:27017';
const dbName = args[1] ?? "isen_drive";
const client = new MongoClient(url);


async function main() {
    await client.connect();
    debug(`[DBConnect] Connected successfully to MongoDB server: ${url}`);
    categories = await getCategories();
    return '[DBConnect] Close Connection.';
}

main()
    .then(debug)
    .catch(console.error)
    .finally(() => client.close());

// --- Side functions ---
async function getCategories(){
    // Connections
    const db = client.db(dbName);
    const table = db.collection('categories');

    // Query
    const categories = await table.find().toArray();

    // Nb products
    for (let i = 0; i < categories.length; i++) {
        categories[i].nbProducts = await getNbProductsByCategory(categories[i]._id);
    }

    // Show results
    console.table(categories);
    return categories;
}

function getNbProductsByCategory(categoryId){
    // Connections
    const db = client.db(dbName);
    const table = db.collection('products');

    // Query
    const results = table.countDocuments(
        { categoryId : categoryId }
    );

    return results;
}