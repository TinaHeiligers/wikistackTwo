'use strict';
var express = require('express');
var router = express.Router();
var Page = require('../models').Page;

module.exports = router;

router.get('/', function(req, res, next) {
  res.redirect('/')
  // Page.findAll({})
  //   .then(function(pages) {
  //     res.render('index', {pages: pages})
  // }).catch(next);
});

router.post('/', function(req, res, next) {
  // res.json(req.body);
  Page.create({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  }).then(function(page) {
    res.json(page);
  })
});
router.get('/add', function(req, res, next) {
  res.render('addpage');
});
