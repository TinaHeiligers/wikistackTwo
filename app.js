'use strict';
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

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
app.listen(3010, function() {
  console.log("Server listening on port 3010");
})
