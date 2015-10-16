
/**
 * Module dependencies.
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var bodyParser = require('body-parser');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))



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

// io.on('connection', function(socket) {
// 	var apiKey = 'AIzaSyCy__w9n9hjn3ZVWBWTu1ImokklKz9OYOE';
// 	console.log("Sent API Key");
// 	socket.emit('getApiKey', apiKey)
// })


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


