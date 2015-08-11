// Once the api loads call enable the search box.

queue = {
  songs:[],
  size:0,
  currentSong:0
}

loaded = false

function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
  console.log("Handed API Loaded")
  loaded = true
}

function outputQ()
{

  for (var i = queue.songs.length - 1; i >= 0; i--) {
    console.log("Title: " + queue.songs[i].title + "  Id: " + queue.songs[i].ID);
  }
  console.log("Current Song Index: " + queue.currentSong);
}

function next()
{
      console.log("Next song...")
      queue.currentSong++;
      var curSong = queue.songs[queue.currentSong];
      if(curSong === undefined)
      {
        queue.currentSong--;
        console.log("No more songs in queue")
        return;
      }
      console.log(curSong);
      loadSong(curSong.title, curSong.ID, false);
}

function updateList()
{
  var listHtml = "";

  for (var i = queue.currentSong+1; i < queue.songs.length; i++) {
    listHtml += "<li>" + queue.songs[i].title + "</li>"
  };
  $(".songList").empty(listHtml);
  $(".songList").append(listHtml);
  if(listHtml === "")
    $(".songTable").hide();
  else
    $(".songTable").show();
}


// Search for a given string.
function search(query, firstSong) {
  if(loaded === false) {
    setTimeout(search, 5000);
  }
  var request = gapi.client.youtube.search.list({
    q: query,
    part: 'snippet'
  });
  var youtubeVideoTitle;
  var youtubeVideoID;
  request.execute(function(response){
    console.log(response)
    youtubeVideoTitle = response.result.items[0].snippet.title;
    youtubeVideoID = response.result.items[0].id.videoId;
    console.log("ID: "+ youtubeVideoID);
    var aSong = new Object();
    aSong.title = youtubeVideoTitle;
    aSong.ID = youtubeVideoID;
    queue.songs.push(aSong);
    queue.size++;
    outputQ();
    updateList();
    if(firstSong) {
      loadSong(youtubeVideoTitle, youtubeVideoID, firstSong);
    }
  });
}

function endedVideo(state) {
  if(state === 0) {
    next();
  }
}

function onPlayerReady(event) {
  console.log("Youtube Player is ready")
}

function loadSong(youtubeVideoTitle, youtubeVideoID, firstSong)
{
    updateList();
    $(".nowPlaying").show();
    $(".whichSong").html(youtubeVideoTitle);
    if (firstSong) 
    {
      player = new YT.Player('player', {
        width: $(".playercontainer").width(),
        height: $(".playercontainer").height()*.85,
        videoId: youtubeVideoID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          showinfo: 0
        },
        events: {
          'onReady': onPlayerReady,
        }
      });
    }
    else {
      player.loadVideoById(youtubeVideoID);
    }
}