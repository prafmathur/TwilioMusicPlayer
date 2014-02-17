//TWILIO

var accountSid = 'ACf0cc48a7b6b9ec6c166dfe9fc7cdde6d';
var authToken = "d210dfcb2c4a87d8502dbab01401f61b";
var client = require('../node_modules/twilio')(accountSid, authToken);


exports.print = function(req, res){
  	var recentSong = postedSong;
	res.send(recentSong);
};



//------------------------------------------------------
//				Depreciated Code
//------------------------------------------------------
	// console.log("waiting for response....")
	// client.messages.list(function(err, data) {
	//     console.log(data.messages[0].body);
	//     recentSong = data.messages[0].body;
	// 	res.send(recentSong);
	// });