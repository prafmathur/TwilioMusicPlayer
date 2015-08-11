$( document ).ready( main() );


function main() {

	// Get the last queued song ever
	$.get('/getLastMessage', function(songName) {

		// Initialize UI for next button
		$("next").click(next);

		console.log(songName);
		lastQueuedSong = songName;
	})

	var firstSong = true;

	// Create loop to check for updates to the song every 3 seconds
	setInterval(function() {
		console.log("Checking for texts");

		$.ajax({
		  type: "GET",
		  ifModified: false, // Only if different song was played at a different time
		  url: "/getLastMessage",
		  success: function (songNameOrCommand) {
		    console.log(songNameOrCommand);
				if (lastQueuedSong != songNameOrCommand) {
					lastQueuedSong = songNameOrCommand;
					if(songNameOrCommand.substring(0,4) === "next") {
						next();
					}
					else {	
						search(lastQueuedSong, firstSong);
						firstSong = false;
						return;
					}
				}
		  },
		});

	}, 3000)
}


