// VARIABLES
const express       = require('express');
var router          = express.Router();
const twig          = require('twig');
// END VARIABLES


// ROAD GLOBAL MANAGEMENT
router.get("/", (req, res) =>{
    res.render("accueil.html.twig");
})
// END ROAD GLOBAL MANAGEMENT

// ERROR 404 MANAGEMENT
router.use((req, res, suite) => {
    const error = new Error("Page non trouvée");
    error.status= 404;
    suite(error);
})
// END ERROR 404 MANAGEMENT

// ALL ERROR MANAGEMENT
router.use((error, req, reponse) => {
    reponse.status(error.status || 500);
    reponse.end(error.message);
})
// END ALL ERROR MANAGEMENT

module.exports = router