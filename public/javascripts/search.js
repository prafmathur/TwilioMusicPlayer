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

  request.execute(function(response) {
    var str = response.result.items[0].id.videoId;
    //$('#search-container').html('<pre>' + str + '</pre>');
    var ytplayer;

    if(firstSong)
    {
      var params = { allowScriptAccess: "always", hidden: "hidden", autoplay: 1};
      var atts = { id: "myytplayer" };
      var videoID = str;
      swfobject.embedSWF("http://www.youtube.com/v/"+videoID+"?autoplay=1&enablejsapi=1&playerapiid=ytplayer&version=3",
                         "ytapiplayer", "0", "0", "8", null, null, params, atts);
      
      ytplayer = document.getElementById("myytplayer");
    }
    else
    {
      ytplayer = document.getElementById("myytplayer");
      ytplayer.loadVideoById(str);
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
    // $("#vid").attr('src', "http://www.youtube.com/embed/" + str + '?autoplay=1');
    // $("#vid").load();
  });
}




/// Do a rest call for message list every 25 seconds with param dateSent > currentTime
/// take the body of the first response and play that song