// VARIABLES
const mongoose      = require('mongoose');
const fs            = require('fs');
const authorModel   = require("../models/authors.model");
const bookModel     = require("../models/books.model");

exports.addAuthor = (req, res) => {    
    const author = new authorModel({
        _id         : new mongoose.Types.ObjectId(),
        lastName    : req.body.lastName,
        firstName   : req.body.firstName,
        age         : req.body.age,
        sex         : (req.body.sex) ? true : false,
    })
    author.save()
        .then(result => {
            res.redirect("/authors");
        })
        .catch(err => {
            console.log("error : ", err);
        })
}

exports.deleteAuthor = (req, res) => {
    authorModel.find()
        .where('firstName').equals('Anonyme')
        .exec()
        .then(author => {
            bookModel.updateMany(
                {"author": req.params.id}, 
                {"$set":{
                    "author": author[0]._id
                }},
                {"multi": true}
            )
                .exec()
                .then(
                    authorModel.remove({ _id: req.params.id})
                        .where('firstName').ne('Anonyme')
                        .exec()
                        .then(res.redirect("/authors"))
                        .catch(err => {
                            console.log("error : ", err);
                        })
                )
                .catch(err => {
                    console.log("error : ", err);
                })
        })
        .catch(err => {
                        console.log("error : ", err);
                    })

}

exports.displayAllAuthors = (req, res) => {
    authorModel.find()
        .populate('books')
        .exec()
        .then(authors => {
            res.render("authors/listing.html.twig", { authors: authors });
        })
        .catch(err => {
            console.log("error : ", err);
        })
}

exports.displayAuthor = (req, res) => {
    authorModel.findById(req.params.id)
        .populate('books')
        .exec()
        .then(author => {
            console.log("author : ", author);
            res.render("authors/author.html.twig", { 
                author      : author,
                isUpdate    : false
            })
        })
        .catch(err => {
            console.log("error : ", err);
        });
}

exports.updateAuthor = (req, res) => {
    const authorUpdate = {
        lastName    : req.body.lastName,
        firstName   : req.body.firstName,
        age         : req.body.age,
        sex         : (req.body.sex) ? true : false,
    }
    authorModel.update({ _id: req.body.id }, authorUpdate)
        .exec()
        .then(result => {
            res.redirect("/authors");
        })
        .catch(err => {
            console.log("error : ", err);
        })
}

exports.updateForm = (req, res) => {
    authorModel.findById(req.params.id)
        .populate('books')
        .exec()
        .then(author => {
            console.log("author : ", author);
            res.render("authors/author.html.twig", { 
                author      : author,
                isUpdate    : true
            })
        })
        .catch(err => {
            console.log("error : ", err);
        });
}