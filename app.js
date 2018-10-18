var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

var app = express();
var port = 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname+'/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var test = require('./routes/router');
app.use('/', test);


var server = app.listen(port, function(){
    console.log('Express listening on port', port);
});