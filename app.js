
/**
 * Module dependencies.
 */

var express = require('express');
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

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/getLastMessage', function(req, res) {
	res.end(postedSong);
});

app.post('/getLastMessage', function(req, res)
{
	postedSong = req.body.Body;
	if(postedSong.toLowerCase() === "next")
	{
		var now = new Date().getTime().toString();
		postedSong = postedSong.toLowerCase();
		postedSong += now;
	}
	console.log(req.body);
	res.end();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
