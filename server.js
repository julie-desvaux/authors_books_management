// VARIABLES
const express       = require('express');
const morgan        = require('morgan');
const routerBook    = require('./routers/book.router');
const routerGlobal  = require('./routers/global.router');
const routerAuthor  = require('./routers/author.router');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const session       = require('express-session');

// CONFIG EXPRESS & PORT
const server        = express();
const port          = 4000;

server.use(express.static('public'));
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({ extended: false }));

// CONNECTION BDD MONGODB
mongoose.connect("mongodb://localhost/library", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// SESSIONS
server.set('trust proxy', 1)
server.use(session({
    secret              : 'keyboard cat',
    resave              : false,
    saveUninitialized   : true,
    cookie              : { maxAge: 60000 }
}))

server.use((req, res, suite) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    suite();
})

// ROAD
server.use("/books", routerBook);
server.use("/authors", routerAuthor);
server.use("/", routerGlobal);

// RUN SERVER ON PORT: `${port}`
server.listen(port);