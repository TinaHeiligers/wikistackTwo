'use strict';
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var User = require('../models').User;
var Page = require('../models').Page;

module.exports = router;

router.get('/', function(req, res, next) {
  User.findAll()
  .then(function(users) {
    res.render('userlist', {users: users});
  })
  .catch(next);
});
router.get('/:userId', function(req, res, next) {
  var findUser = User.findById(req.params.userId);
  var findPages = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  Promise.all([findUser, findPages])
    .spread(function(user, userPages) {
      res.render('userpages', {
        pages: userPages,
        user: user
      });
    })
    .catch(next);
});
