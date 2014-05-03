$( document ).ready( main() );

function main()
{
	//get last queued song
	$(".player").hide();
	var lastQueuedSong;
	$.get('/recentSong', function(data)
	{
		$(".next").click(next);
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
				if(data.substring(0,4) === "next")
				{
					next();
				}
				else
				{	
					search(lastQueuedSong, firstSong);
					firstSong = false;
				}
			}	
		  },
		});
	}, 3000)
}

