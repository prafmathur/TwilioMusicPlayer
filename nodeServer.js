var http = require("http");

// Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
var accountSid = 'ACf0cc48a7b6b9ec6c166dfe9fc7cdde6d';
var authToken = "d210dfcb2c4a87d8502dbab01401f61b";
var client = require('/usr/local/lib/node_modules/twilio')(accountSid, authToken);
 
function waitForIt()
{
	client.messages.list(function(err, data) {
		if(data == null)
		{
			console.log("empty")
		}
	    console.log(data.messages[0].body);
	    
	});
}


function onRequest(request, response) {
  console.log("Request received.");	 
  waitForIt();	
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Server has started.");