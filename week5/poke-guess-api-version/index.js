var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8080;

var pokeArray = require('./pokemon-data.js');
//var pokeArray = createPokeArray();

app.use(express.static(__dirname + '/frontend')); //folder with front end files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//console.log(pokeArray);

//console.log(__dirname);

function findUnguessed (guessedArray) {
	//console.log(guessedArray);
	var unguessed = pokeArray.filter(function(obj) {
	  return guessedArray.indexOf(obj.pokeId) == -1;
    });
	return unguessed; //array of unguessed pokemon objects
}

function getRandPokemon (unguessedArray) {
	var pokemonIndex = Math.floor(Math.random() * unguessedArray.length);
	return unguessedArray[pokemonIndex];
}

app.post('/pokemon', function (req, res) {
	//request: new pokemon that has not been shown (add user id cookie later if needed)
	//response: pokemon image and pokemon id
	
	//console.log(req.body);
	var data = {};
	var guessedPokemon = req.body.guessed;
	//console.log(guessedPokemon);

	var unguessedPokemon = findUnguessed(guessedPokemon);
	//console.log(unguessedPokemon);
	var randPokemon = getRandPokemon(unguessedPokemon);

	data.pokeId = randPokemon.pokeId;
	data.pokeImg = "assets/img/" + data.pokeId + ".png";
	
	var jsonData = JSON.stringify(data);
	//console.log(data);
	
	res.send(jsonData);
	
});

app.post('/guess', function (req, res) {
	//request: provides the user's guess with pokemon id
	//response: guess is correct or incorrect
	var data = {};

	var guess = req.body.guess;
	var pokeId = req.body.pokeId;
	
	var pokeIndex = parseInt(pokeId) - 1;
	var pokeName = pokeArray[pokeIndex].pokeName;
	//console.log(pokeIndex);
	//console.log(pokeName);

	if (guess === pokeName) {
		data.correct = true;
	} else {
		data.correct = false;
	}

	var jsonData = JSON.stringify(data);

	res.send(jsonData);
	
});

app.listen(port);
console.log('Listening on port ' + port);