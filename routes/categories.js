const express = require("express");
const Category = require("../model/Category");
const Product = require("../model/Product");
const router = express.Router();

// CRUD
router.get("/", async (req, res) => {
    res.render(
        "categories.pug",
        {
            title: "Rayons",
            categories: await Category.getAll(),
        }
    );
});

router.get("/:idCategory/update", (req, res) => {
    let item = Category.getById(req.params.idCategory);
    res.render(
        "categoryForm.pug",
        {
            title: "Mettre à jour un rayon",
            item: item,
        }
    );
});

router.get("/new", (req, res) => {
    res.render(
        "categoryForm.pug",
        {
            title: "Créer un rayon",
        }
    );
});

router.get("/:idCategory", async (req, res) => {
    let category = await Category.getById(req.params.idCategory);
    let products = await Product.getByCategory(req.params.idCategory);
    res.render(
        "category.pug",
        {
            title: `Produits du rayon ${category.name}`,
            products: products,
        }
    );
});




router.get("/:idCategory/delete", (req, res) => {
    let categoryId = req.params.idCategory;
    let category = Category.getById(categoryId);
    res.render(
        "categoryDelete.pug",
        {
            title: "Supprimer un rayon : " + category.name,
            id: categoryId,
        }
    );
});


module.exports = router;