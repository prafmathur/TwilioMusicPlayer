
/**
 * Module dependencies.
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


postedSong = "";

app.get('/', function(req, res) {
	res.render('index');
});

// app.get('/getLastMessage', function(req, res) {
// 	res.end(postedSong);
// });

app.post('/getLastMessage', function(req, res)
{
	postedSong = req.body.Body;
	if(postedSong.toLowerCase() === "next")
	{
		var now = new Date().getTime().toString();
		postedSong = postedSong.toLowerCase();
		postedSong += now;
	}
	io.sockets.emit('textRecieved', postedSong);
	
	res.end();
});


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


