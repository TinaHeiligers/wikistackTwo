'use strict';
var express = require('express');
var router = express.Router();
var Page = require('../models').Page;

module.exports = router;

router.get('/', function(req, res, next) {
  Page.findAll({})
    .then(function(pages) {
      res.render('index', {pages: pages})
  }).catch(next);
});

router.post('/', function(req, res, next) {
  // res.json(req.body);
  Page.create({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  }).then(function(page) {
    res.redirect(page.route);
  }).catch(next);
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(page){
    res.render('wikipage', {
      page: page
    });
  })
  .catch(next);

});
