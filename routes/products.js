const express = require("express");
const Category = require("../model/Category");
const Product = require("../model/Product");
const router = express.Router();

// CRUD

router.get("/new", (req, res) => {
    res.render(
        "productForm.pug",
        {
            title: "Créer un produit",
            categories: Category.getAll(),
        }
    );
});

router.get("/:idProduct/update", async (req, res) => {
    let item = await Product.getById(req.params.idProduct);
    res.render(
        "productForm.pug",
        {
            title: "Éditer un produit",
            categories: Category.getAll(),
            item: item,
        }
    );
});

router.get("/:idProduct/delete", async (req, res) => {
    let productId = await req.params.idProduct;
    let product = await await Product.getById(productId);
    res.render(
        "productDelete.pug",
        {
            title: "Supprimer un produit : " + product.name,
            id: productId,
        }
    );
});

router.get("/:idProduct", async (req, res) => {
    let item = await Product.getById(req.params.idProduct);
    let category = await Category.getById(item.categoryId);

    res.render(
        "products.pug",
        {
            title: "Détail du produit : " + item.name,
            item: item,
            category: category,
        }
    );
});

module.exports = router;