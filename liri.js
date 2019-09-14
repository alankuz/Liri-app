require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Runs the Random.txt file

function inputPlacer(dataOne, dataTwo) {
    if (dataOne === 'concert-this') {
        process.argv[2] = 'concert-this'
        input = dataTwo
        concerter();
    }
    if (dataOne === 'spotify-this-song') {
        process.argv[2] = 'spotify-this-song'
        input = dataTwo
        spotifyer();

    }
    if (dataOne === 'movie-this') {
        process.argv[2] = 'movie-this'
        input = dataTwo
        movier();
    }
}

// Triggers Random.txt reading 

if (process.argv[2] === "do-what-it-says") {
    fs.readFile('random.txt', 'utf8', function (err, info) {
        if (err) {
            return console.log(err);
        }
        var infotemp = info.split(',');
        inputPlacer(infotemp[0], infotemp[1]);
    });
}

// Reads input and runs function related

var input = process.argv[3]
if (process.argv[2] === "concert-this") {
    concerter();
}
if (process.argv[2] === "spotify-this-song") {
    spotifyer();
}
if (process.argv[2] === "movie-this") {
    movier();
}

// All functions that run the npm packages

function concerter() {
    if (input === undefined) {
        input = "Muse"; //default
    }
    var localbandQ = "https://rest.bandsintown.com/artists/" + input.split(' ').join('+') + "/events?app_id=codingbootcamp"
    request(localbandQ, function (error, response, body) {
        if (error) {
            return console.log('error occurred: ' + error);
        }
        console.log("===========================================================================");
        console.log('Venue results For [' + input + "]")
        console.log("===========================================================================");
        var bandInfo = JSON.parse(body)
        for (i = 0; i < bandInfo.length; i++) {
            var x = i + 1
            console.log("===========================================================================");
            console.log("--------------Venue number " + x + "--------------");
            console.log("===========================================================================");
            console.log("--------------Venue--------------");
            console.log(bandInfo[i].venue.name);
            console.log("--------------Venue Location--------------");
            console.log(bandInfo[i].venue.city);
            console.log("--------------Venue Date--------------");
            console.log(moment(bandInfo[i].datetime).format('L'));
        }
    })
}

function spotifyer() {
    if (input === undefined) {
        input = "The Sign"; //default
    }
    console.log("===========================================================================");
    console.log("Spotify Information For [" + input + "]");

    spotify.search({ type: 'track', query: input }, function (error, data) {
        if (error) {
            return console.log('error occurred: ' + error);
        }
        var song = data.tracks.items
        console.log('--------------Artist--------------');
        console.log(song[0].artists[0].name);
        console.log('--------------Song--------------');
        console.log(song[0].name);
        console.log('--------------Preview Link--------------');
        console.log(song[0].preview_url);
        console.log('--------------Album--------------');
        console.log(song[0].album.name);
    });
}

function movier() {
    if (input === undefined) {
        input = "Tropic Thunder"; //default
    }
    console.log("===========================================================================");
    console.log("Movie Information For [" + input + "]");
    console.log("===========================================================================");
    var movieQ = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=40a1c31a"
    request(movieQ, function (error, response, body) {
        if (error) {
            return console.log('error occurred: ' + error);
        }
        var movInfo = JSON.parse(body)
        console.log('--------------Title--------------');
        console.log(movInfo.Title);
        console.log('--------------Year--------------');
        console.log(movInfo.Year);
        console.log('--------------IMDB Rating--------------');
        console.log(movInfo.imdbRating);
        console.log('--------------Rotten Tomato Rating--------------');
        console.log(movInfo.Ratings[1].Source + " [" + movInfo.Ratings[1].Value + "]");
        console.log('--------------Countries Show In--------------');
        console.log(movInfo.Country);
        console.log('--------------Languages Available--------------');
        console.log(movInfo.Language);
        console.log('--------------Main Actors--------------');
        console.log(movInfo.Actors);
        console.log('--------------Plot--------------');
        console.log(movInfo.Plot);
        console.log('----------------------------');


    })
}