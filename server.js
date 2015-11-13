var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var session = require('express-session')
app.use(express.static(__dirname+'/client'))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
app.use(session({
  secret: 'secrey key',
  resave: false, 
  saveUninitialized: true,
  cookie: {maxAge: 100000000}
}))
require('./server/config/mongoose.js')
var routes = require('./server/config/routes.js')
routes(app);
app.listen(8000, function(){
	console.log('on 8000')
})