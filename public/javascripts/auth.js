var apiKey = 'AIzaSyCy__w9n9hjn3ZVWBWTu1ImokklKz9OYOE';

googleApiClientReady = function() {
  console.log("API IS READY");
  gapi.auth.init(function() {
    window.setTimeout(handleAuthResult, 1);
  });
}


// Handles the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
    console.log(authResult);
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function() {
      handleAPILoaded();
    });
}
