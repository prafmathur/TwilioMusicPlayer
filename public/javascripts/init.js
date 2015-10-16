$( document ).ready( main() );

// var apiKey;


function main() {
	var firstSong = true;
	var socket = io();

	// socket.on('getApiKey', function(key){

	// 	console.log(key)
	// 	apiKey = key;
	// }) 

	socket.on('textRecieved', function (songNameOrCommand) {		
		// Initialize UI for next button
		$(".nextButton").click(next);

    	console.log(songNameOrCommand);
		if(songNameOrCommand.substring(0,4) === "next") {
			next();
		}
		else {	
			search(songNameOrCommand, firstSong);
			firstSong = false;
			return;
		}
	})
}


