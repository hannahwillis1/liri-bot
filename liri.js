var fs = require("fs");
require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

var keys = require("./keys");
console.log(keys.spotify);
var userCommand = process.argv[2];
var secondCommand = new Spotify(keys.spotify);

switch (userCommand) {
  case "concert-this":
    console.log("concert");
    break;
  case "spotify-this-song":
    console.log("song");
    break;
  case "movie-this":
    console.log("movie");
    break;
  case "do-what-it-says":
    console.log("done");
    break;
  default:
    console.log("Please enter correct input");
    break;
}

function spotifySearch() {
  var searchSpotify;
  if (secondCommand === undefined) {
    searchSpotify = "Come Monday";
  } else {
    searchSpotify = secondCommand;
  }

  for (i = 4; i < process.argv.length; i++) {
    secondCommand += "+" + process.argv[i];
  }

  spotify.search({ type: "song", query: searchSpotify }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    } else {
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
    }
  });
}

var Bands = require("node-bandsintown-api");
var userCommand2 = process.argv[3];
var secondCommand2 = new Bands(keys.bandsintown);

function bandsSearch() {
  var searchBands;
  if (secondCommand2 === undefined) {
    searchBands = "Come Monday";
  } else {
    searchBands = secondCommand2;
  }

  for (i = 5; i < process.argv.length; i++) {
    secondCommand2 += "+" + process.argv[i];
  }

  bandsintown.search({ type: "artist", query: searchBands }, function(
    err,
    data
  ) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    } else {
      console.log("Artist: " + data.artists[0].name);
      console.log("Concert Dates: " + data.concert[0].name);
    }
  });
}
