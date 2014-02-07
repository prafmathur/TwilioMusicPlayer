// Once the api loads call enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);  
}


// Search for a given string.
function search(query, firstSong) {
  var request = gapi.client.youtube.search.list({
    q: query,
    part: 'snippet'
  });
  var youtubeVideoTitle;
  var youtubeVideoID;
  request.execute(function(response){
    youtubeVideoTitle = response.result.items[0].snippet.title;
    youtubeVideoID = response.result.items[0].id.videoId;
    console.log("ID---->"+youtubeVideoID);

    loadSong(youtubeVideoTitle, youtubeVideoID, firstSong);
  });
}



function loadSong(youtubeVideoTitle, youtubeVideoID, firstSong)
{
    $(".nowPlaying").show();
    $(".whichSong").html("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + youtubeVideoTitle + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" );
    var ytplayer;
    if(firstSong)
    {
      var params = { allowScriptAccess: "always", hidden: "hidden", autoplay: 1};
      var atts = { id: "myytplayer" };
      swfobject.embedSWF("http://www.youtube.com/v/"+youtubeVideoID+"?autoplay=1&enablejsapi=1&playerapiid=ytplayer&version=3",
                         "ytapiplayer", "0", "0", "8", null, null, params, atts);
      ytplayer = document.getElementById("myytplayer");
    }
    else
    {
      ytplayer = document.getElementById("myytplayer");
      ytplayer.loadVideoById(youtubeVideoID);
    }

    var playing = true;
    $("#playpause").removeClass('play');
    $("#playpause").addClass('pause');
    $("#playpause").click(function()
    {
      if(ytplayer)
      {
        if(!playing)
        {
          ytplayer.playVideo();
          playing = true;
          $("#playpause").removeClass('play');
          $("#playpause").addClass('pause');
        }
        else
        {
          ytplayer.pauseVideo();
          playing = false;
          $("#playpause").removeClass('pause');
          $("#playpause").addClass('play');

        }
      }
      else
      {
        console.log("No song loaded")
      }
    });
}