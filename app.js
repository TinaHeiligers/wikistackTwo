'use strict';
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var Page = require('./models').Page;
var User = require('./models').User;
var wikiRouter = require('./routes/wiki');
var usersRouter = require('./routes/users');

var app = express();

//MIDDLEWARE

//logging requests
app.use(morgan('dev'));
//static files
app.use(express.static(path.join(__dirname, '/public')));

//parsing both urlencoded requests and json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//templating
nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

//render html
app.get('/', function(req, res) {
  res.render('/views/index');
});
//error handling:
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal Error");
});

//sync the db first then tell the app to listen
Page.sync({force: true})
    .then(function() {
      User.sync({force: true})
    })
    .then(function() {
      app.listen(3001, function() {
        console.log("Server listening on port 3010");
      })
    })
