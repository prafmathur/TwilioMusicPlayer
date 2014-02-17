
/*
 * GET home page.
 */


//TWILIO

// var accountSid = 'ACf0cc48a7b6b9ec6c166dfe9fc7cdde6d';
// var authToken = "d210dfcb2c4a87d8502dbab01401f61b";
// var client = require('../node_modules/twilio')(accountSid, authToken);


exports.index = function(req, res){
	res.render('index');
};