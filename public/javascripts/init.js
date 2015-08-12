$( document ).ready( main() );


function main() {
	var firstSong = true;
	var socket = io();

	socket.on('textRecieved', function (songNameOrCommand) {		
		// Initialize UI for next button
		$("next").click(next);

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


