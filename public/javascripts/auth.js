var apiKey = 'AIzaSyBT7h2JNunEz8bRAYl9JA2lnw3iDNEbGjU';

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