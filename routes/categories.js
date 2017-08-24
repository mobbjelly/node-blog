/**
 * Created by Joey on 2016/4/5 0005.
 */
var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

//Homepage Blog Posts
router.get('/add', function(req, res, next) {
  res.render('addcategory', {
    "title": "Add Category"
  });
});

router.get('/show/:category', function (req, res, next) {
  var posts = db.get('posts');
  posts.find({
    category: req.params.category
  }, {}, function (err, posts) {
    res.render('index', {
      "title": req.params.category,
      "posts": posts
    });
  });
});

router.post('/add', function (req, res) {
  //Get Form values
  var title = req.body.title;

  //Form Validation
  req.checkBody('title', 'Title field is required');

  //Check Errors
  var errors = req.validationErrors();
  if (errors) {
    res.render('addcategory', {
      "errors": errors,
      "title": title
    });
  } else {
    var categories = db.get('categories');

    //Submit to db
    categories.insert({
      "title": title
    }, function (err, categories) {
      if (err) {
        res.send("There was an issue when submitting the categories");
      } else {
        req.flash("alert alert-success", "Category Submitted");
        res.location('/');
        res.redirect('/');
      }
    });
  }
});

module.exports = router;
