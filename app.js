
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var recentSong = require('./routes/recentSong');
var http = require('http');
var path = require('path');



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


postedSong = "";

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/recentSong', recentSong.print);
app.post('/getLastMessage', function(req, res)
{
	postedSong = req.body.Body;
	console.log(req.body);
	res.end();
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
