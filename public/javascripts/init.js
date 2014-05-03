$( document ).ready( main() );

function main()
{
	//get last queued song
	$(".player").hide();
	$(".next").click(function(){
		console.log("Next song...")
		queue.currentSong++;
		var curSong = queue.songs[queue.songs.currentSong];
		loadSong(curSong.title, curSong.ID, 0);
	});
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
				firstSong = false;
			}	
		  },
		});
	}, 3000)
}

