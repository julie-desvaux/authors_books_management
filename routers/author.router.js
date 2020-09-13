// VARIABLES
const express       = require('express');
var router          = express.Router();
const twig          = require('twig');
const authorController = require("../controllers/author.controller");
// END VARIABLES

// ROADS BOOK MANAGEMENT
router.get("/:id", authorController.displayAuthor)
router.get("/", authorController.displayAllAuthors)
router.get("/update/:id", authorController.updateForm)
router.post("/", authorController.addAuthor)
router.post("/delete/:id", authorController.deleteAuthor)
router.post("/updateServer", authorController.updateAuthor)

module.exports = router