// VARIABLES
const express       = require('express');
var router          = express.Router();
const twig          = require('twig');
const multer        = require('multer');
const bookController = require("../controllers/book.controller");
// END VARIABLES


// CONFIG MULTER
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './public/img')
    },
    filename : (req, file, cb) => {
        const date = new Date().toLocaleDateString();
        cb(null, date + "-" + Math.round(Math.random() * 10000) + "-" + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error("L'image n'est pas acceptée"), false)
    }
}

const upload = multer({
    storage : storage,
    limits  : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})
// END CONFIG MULTER

// ROADS BOOK MANAGEMENT
router.get("/", bookController.displayBooks)
router.get("/:id", bookController.displayBookByID)
router.get("/update/:id", bookController.updateForm)
router.post("/", upload.single('image'), bookController.addBook)
router.post("/delete/:id", bookController.deleteBookByID)
router.post('/updateServer', bookController.updateBookByID)
router.post('/updateImage', upload.single('image'), bookController.updateImage)
// END ROADS BOOK MANAGEMENT


module.exports = router