const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render(
        "index.pug",
        {title: "Accueil"}
    );
});

module.exports = router;