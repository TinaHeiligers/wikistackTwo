'use strict';
var express = require('express');
var router = express.Router();
var Page = require('../models').Page;
var User = require('../models').User;

module.exports = router;

router.get('/', function(req, res, next) {
  Page.findAll({})
    .then(function(pages) {
      res.render('index', {pages: pages})
  }).catch(next);
});

router.post('/', function(req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .spread(function(user, createdPageBool) {
    // console.log('user');
    // console.log(user);
    // console.log('createdPageBool');
    // console.log(createdPageBool);
    return Page.create(req.body)
      .then(function(page) {
        return page.setAuthor(user);
      });
  })
  .then(function(page) {
    res.redirect(page.route);
  })
  .catch(next);
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
        {model: User, as: 'author'}
    ]
  })
  .then(function(page){
    if (page === null) {
      throw ('No page found with this title', 404);
    } else {
        res.render('wikipage', {
        page: page
      });
    }
  })
  .catch(next);

});
