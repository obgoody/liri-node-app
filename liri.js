var axios = require("axios");

axios.get("https://en.wikipedia.org/wiki/Kudos_(granola_bar)").then(
  function(response) {
       console.log(response.data);
  },
  
  
  var bit_js = require('bit_js');
  var Spotify = require('node-spotify-api');
  var imdb = require('imdb-node-api');


// Replace with your mapquest consumer API key
var options = {
  provider: "bands-in-town",ß
  apiKey: "5Z91W6eGkoJIbceCHQl6WxSlOxcgiA3k"
};
var options = {
  'artist': 'skrillex',
  'app_id': 'my_app_id',
};

var optionsEvents = {
  'artist': 'skrillex',
  'app_id': 'my_app_id',
  'daterange': '2017-09-20',


// ======spotify=======


var spotify = new Spotify({
  id: <your spotify client id>,
  secret: <your spotify client secret>
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

// ==============================================================


imdb.searchMovies('xmen', function (movies) {
    console.log(movies);
}, function(error) { 
    console.error(error);
});