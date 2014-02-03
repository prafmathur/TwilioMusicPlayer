$( document ).ready( main() );

function main()
{
	//get last queued song
	$(".player").hide();

	var lastQueuedSong;
	$.get('/recentSong', function(data)
	{
		console.log(data);
		lastQueuedSong = data;
	})
	var firstSong = true;
	setInterval(function()
 	{	
		console.log("Checking for message....")
	
		$.ajax({
		  type: "GET",
		  ifModified: false,
		  url: "/recentSong",
		  success: function (data) {
		    console.log(data);
			
			if (lastQueuedSong != data)
			{
				lastQueuedSong = data;
				search(lastQueuedSong, firstSong);
				$(".whichSong").html("NOW PLAYING:  " + lastQueuedSong);
				firstSong = false;
			}	

		  },
		});
	}, 6000)

}

