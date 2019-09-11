require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var request = require("request")
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var input = process.argv[3]

if (process.argv[2] = "concert-this") {
    var localbandQ = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
    // Use moment to format dat the mm/dd/yyyy
}
if (process.argv[2] = "spotify-this-song") {
    if (input === undefined) {
        input = "The Sign"; //default Song
    }

    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var song = data.tracks.items
        console.log('Artist------------')
        console.log(song[0].artists[0].name);
        console.log('Song------------')
        console.log(song[0].name);
        console.log('Preview Link------------')
        console.log(song[0].preview_url);
        console.log('Album------------')
        console.log(song[0].album.name);

    });
    // If no song is provided then your program will default to "The Sign" by Ace of Base.
}
if (process.argv[2] = "movie-this") {
    var movieQ = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=40a1c31a"
    request(movieQ, function(err, response, body) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    // console.log(response)
    var movInfo = JSON.parse(body)
    console.log(movInfo)
    console.log(movInfo.Title)
    console.log(movInfo.Year)
    console.log(movInfo.imdbRating)
    console.log(movInfo.Ratings[1].Source + movInfo.Ratings[1].Value)
    console.log(movInfo.imdbRating)
    console.log(movInfo.Country)
    console.log(movInfo.Language)
    console.log(movInfo.Actors)
    console.log(movInfo.Plot)
})
}
