
var axios = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var moment = require('moment');
moment().format();

//======spotify keys=========
var spotify = new Spotify(keys.spotify);

//variable for input
var command = process.argv[2];
var input = process.argv[3];

// axios.get("https://en.wikipedia.org/wiki/Kudos_(granola_bar)").then(
//   function(response) {
//     console.log(response.data);
//   },
//===========concert-this================


function concertIt(bandQuery) {

    
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp#";
    
    console.log(queryUrl);

    axios(queryUrl, function (error, response, body) {

        
        if (!error && response.statusCode === 200) {

            var concertData = JSON.parse(body);

            var concertDT = concertData[0].datetime
            var momentDT = moment().format('L');


           
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            // * Name of the venue
            console.log("Venue Name : " + concertData[0].venue.name +
                // * Venue location
                "\nVenue Location: " + concertData[0].venue.city + "," + concertData[0].venue.country +
                //  * Date of the Event (use moment to format this as "MM/DD/YYYY")
                "\nDate of the Event: " + momentDT +
                "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            
        };
    });
}


//===============spotify-this-song=======================

function spotifyIt(musicSearch) {

    
    if (musicSearch === undefined || null) {
        musicSearch = "The Sign Ace of Base";
    }

    spotify.search({ type: 'track', query: musicSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
                    
        else {
            for (i = 0; i < data.tracks.items.length && i < 3; i++){
            
                var musicQuery = data.tracks.items[i];
               
                console.log("Artist: " + musicQuery.artists[0].name +
                //== Name
                "\nSong Name: " + musicQuery.name +
                //==preview link 
                "\nLink to Song: " + musicQuery.preview_url +
                //== The album 
                "\nAlbum Name: " + musicQuery.album.name +
                "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            }
        };  
    });
}

    // ======= movie-this ==========
function movieIt (movieQuery) {
 
    // === default 'Mr.Nobody.'
     if (movieQuery === undefined || null) {
            movieQuery = "Mr.Nobody";
        }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    axios(queryUrl, function (error, response, body) { 
        
    
       if (!error && response.statusCode === 200) {      
           
            var movieData = JSON.parse(body);
                    // console.table(movieData)   
           
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            // == Title===              
                console.log("Movie Title: " + movieData.Title +
            // ==Year ===
                "\nYear: " + movieData.released +
            //== Rating ===
                "\nIMDB Rating: " + movieData.imdbRating +
            // ==Rotten Tomatoes ====
                "\nRotten Tomatoes Rating: " + movieData.Ratings[1].Value +
            // == Country ===
                "\nCountry: " + movieData.Country +
            // ==Language ===
                "\nLanguage: " + movieData.Language +
            //== Plot ===
                "\nPlot: " + movieData.Plot +
            // ==Actors 
                "\nActors: " + movieData.Actors +
                "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");             
            // };
        };
    }); 
}


// Switch found on w3 schools
var ask = function (commands, funData){
    switch(commands) {
        case "concert-this":
            concertIt(funData);
            break;
        case "movie-this" :
            movieIt(funData);
            break;    
        case 'spotify-this-song':
            spotifyIt(funData); 
            break;
        case 'do-what-it-says':
            doWhatItSays(); 
            break;
        default:
        console.log("Invalid command. Please try again");
    }
};


// ===do-what-it-says====



var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
            var randomText = data.split(",");
        
        if (randomText.length == 2) {
            ask(randomText[0], randomText[1]);
        }
        else if (randomText.length == 1) {
            ask(randomText[0]);
        }
    });
}
// asigns args to ask for switch case
ask (command, input);