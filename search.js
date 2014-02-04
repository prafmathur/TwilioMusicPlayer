// Once the api loads call enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a given string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    var str = response.result.items[0].id.videoId;
    $('#search-container').html('<pre>' + str + '</pre>');
    $("#vid").attr('src', "http://www.youtube.com/embed/" + str + '?autoplay=1');
    $("#vid").load();
  });
}




/// Do a rest call for message list every 25 seconds with param dateSent > currentTime
/// take the body of the first response and play that song