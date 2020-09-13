// VARIABLES
const mongoose      = require('mongoose');
const fs            = require('fs');
const bookModel     = require("../models/books.model");
const authorModel     = require("../models/authors.model");

exports.addBook = (req, res) =>{
    const book = new bookModel({
        _id         : new mongoose.Types.ObjectId(),
        name        : req.body.title,
        author      : req.body.author,
        pages       : req.body.pages,
        description : req.body.description,
        image       : req.file.path.substring(11)
    });
    book.save()
        .then(result => {
            if (result.nModified < 1) throw new Error("Requete de suppression échouée");
            // console.log(result);
            req.session.message = {
                type    : 'success',
                content : 'Ajout effectué'
            }
            res.redirect('/books');
        })
        .catch(err => {
            req.session.message = {
                type    : 'danger',
                content : err.message
            }
            res.redirect('/books');
        })
}

exports.deleteBookByID = (req, res) =>{
    const book = bookModel.findById(req.params.id)
        .select('image')
        .exec()
        .then(book => {
            fs.unlink(`./public/img/${book.image}`, err => {
                console.log("error : ", err)
            })
                bookModel.remove({ _id: req.params.id })
                    .exec()
                    .then(result => {
                        if (result.nModified < 1) throw new Error("Requete de suppression échouée");
                        req.session.message = {
                            type    : 'success',
                            content : 'Suppression effectuée'
                        }
                        res.redirect('/books')
                    })
                    .catch(err => {
                        req.session.message = {
                            type    : 'danger',
                            content : err.message
                        }
                        res.redirect('/books');
                    })
        })
        .catch(err => {
            req.session.message = {
                type    : 'danger',
                content : err.message
            }
            res.redirect('/books');
        })
}

exports.displayBooks = (req, res) =>{
    authorModel.find()
        .exec()
        .then(authors => {
            bookModel.find()
                .populate('author')
                .exec()
                .then(books => {
                    res.render("books/listing.html.twig", { 
                        books   : books, 
                        authors :  authors, 
                        message : res.locals.message})
                })
                .catch(err => {
                    console.log("error : ", err);
                });
        })
        .catch(err => {
            console.log("error : ", err);
        });  
}

exports.displayBookByID = (req, res) =>{
    bookModel.findById(req.params.id)
        .populate("author")
        .exec()
        .then(book => {
            res.render("books/book.html.twig", { 
                book      : book, 
                isUpdate  : false 
            })
        })
        .catch(err => {
            console.log("error : ", err);
        });
}

exports.updateForm = (req, res) =>{
    // console.log(req.params.id)
    authorModel.find()
        .exec()
        .then(authors => {
            console.log("Authors : ", authors)
            bookModel.findById(req.params.id)
                .populate("author")
                .exec()
                .then(book => {
                    console.log("Book : ", book)
                    res.render("books/book.html.twig", { 
                        book      : book, 
                        authors   : authors,
                        isUpdate  : true 
                    })
                })
                .catch(err => {
                    console.log("error : ", err);
                });
        })
        .catch(err => {
            console.log("error : ", err);
        });    
}

exports.updateBookByID = (req, res) => {
    // console.log(req.body);
    const updateBook = {
        name        : req.body.title,
        author      : req.body.author,
        pages       : req.body.pages,
        description : req.body.description
    }
    bookModel.update({ _id: req.body.id }, updateBook)
        .exec()
        .then(result => {
            if (result.nModified < 1) throw new Error("Requete de modification échouée");
            req.session.message = {
                type    : 'success',
                content : 'Modification effectuée'
            }
            res.redirect('/books');
        })
        .catch(err => {
            req.session.message = {
                type    : 'danger',
                content : err.message
            }
            res.redirect('/books');
        })
}

exports.updateImage = (req, res) => {
    const book = bookModel.findById(req.body.id)
        .select('image')
        .exec()
        .then(book => {
            fs.unlink(`./public/img/${book.image}`, err => {
                console.log("error : ", err)
            })
            const updateBook = {
                image       : req.file.path.substring(11)
            }
            bookModel.update({ _id: req.body.id }, updateBook)
                .exec()
                .then(result => {
                    res.redirect(`/books/update/${req.body.id}`)
                })
                .catch(err => {
                    req.session.message = {
                        type    : 'danger',
                        content : err.message
                    }
                    res.redirect('/books');
                })
        })
        .catch(err => {
            console.log("error : ", err);
        })
}