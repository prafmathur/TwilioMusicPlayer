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

function outputQ() {
  for (var i = queue.songs.length - 1; i >= 0; i--) {
    console.log("Title: " + queue.songs[i].title + "  Id: " + queue.songs[i].ID);
  }
  console.log("Current Song Index: " + queue.currentSong);
}

function next() {
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
  loadSong(curSong, false);
}

function updateList() {
  outputQ();
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


  request.execute(function(response){
    var song = new Object();
    song.title = response.result.items[0].snippet.title;
    song.videoId = response.result.items[0].id.videoId;
    queue.songs.push(song);
    queue.size++;
    updateList();

    if(firstSong) {
      loadSong(song, firstSong);
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

function loadSong(song, firstSong) {
    updateList();
    $(".nowPlaying").show();
    $(".whichSong").html(song.title);
    if (firstSong) 
    {
      player = new YT.Player('player', {
        width: $(".playercontainer").width(),
        height: $(".playercontainer").height()*.85,
        videoId: song.videoId,
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
      console.log("Now about to play " + song.title)
      player.loadVideoById(song.videoId);
    }
}