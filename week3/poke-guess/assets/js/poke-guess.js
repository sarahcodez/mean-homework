$(document).ready(function() {

//Declare Pokemon object class, Pokemon object instances

	function Pokemon(pokeName, pokeFile) {
		this.pokeName = pokeName;
		this.pokeFile = "assets/img/" + pokeFile + ".png";
	}

	var bulbasaur = new Pokemon("bulbasaur", "001");
	var ivysaur = new Pokemon("ivysaur", "002");
	var venusaur = new Pokemon("venusaur", "003");
	var charmander = new Pokemon("charmander", "004");
	var charmeleon = new Pokemon("charmeleon", "005");
	var charizard = new Pokemon("charizard", "006");
	var squirtle = new Pokemon("squirtle", "007");
	var wartortle = new Pokemon("wartortle", "008");
	var blastoise = new Pokemon("blastoise", "009");
	var caterpie = new Pokemon("caterpie", "010");
	var metapod = new Pokemon("metapod", "011");
	var butterfree = new Pokemon("butterfree", "012");
	var weedle = new Pokemon("weedle", "013");
	var kakuna = new Pokemon("kakuna", "014");
	var beedrill = new Pokemon("beedrill", "015");
	var pidgey = new Pokemon("pidgey", "016");
	var pidgeotto = new Pokemon("pidgeotto", "017");
	var pidgeot = new Pokemon("pidgeot", "018");
	var rattata = new Pokemon("rattata", "019");
	var raticate = new Pokemon("raticate", "020");

//Initialize guess variables, arrays for unguessed (unguessed/guessed-wrong) and guessed (guessed-right) Pokemon

	var wrongGuesses = 0;
	var rightGuesses = 0;

	var unguessedPokemon = [bulbasaur, ivysaur, venusaur, charmander, charmeleon, charizard, 
		squirtle, wartortle, blastoise, caterpie, metapod, butterfree, weedle, kakuna, 
		beedrill, pidgey, pidgeotto, pidgeot, rattata, raticate];

	var guessedPokemon = [];

//Declare variables and function for randomizing pokemon and accessing it
	
	var randPokemon;
	var pokemonIndex;

	var getRandPokemon = function() {
		pokemonIndex = Math.floor(Math.random() * unguessedPokemon.length);
		return unguessedPokemon[pokemonIndex];
	};

//Declare function to change images of guess pokemon and pokeballs

	function changeImage(currentImgID, newImg) {
		$(currentImgID).attr("src", newImg);
	}

//Declare function to change pokemon
	
	function changePokemon() {
		randPokemon = getRandPokemon();
		changeImage("#pokemon-img", randPokemon.pokeFile);
	}		

//Declare function to show images of sad pokemon

	function showSad() {
		$("#sad" + wrongGuesses).show();
	}

//Declare sounds
	
	var correctSound = new Audio("assets/audio/correct_guess.wav");
	var incorrectSound = new Audio("assets/audio/incorrect_guess.wav");
	var winMusic = new Audio("assets/audio/win_music.wav");
	var gameOverSound = new Audio("assets/audio/game_over.wav");

//Declare timer function and initialize it at 10 seconds

	var timerNum = 10;

	function setTimer() {
  	    var newNum;

		if (timerNum >= 10) {
	      newNum = timerNum;
	    } else {
	      newNum = "0" + timerNum;
	    }

	    timerNum--;	  
		$("#timer").html(newNum);
	  
	    if (timerNum < 0) {
	    wrongGuesses += 1;
	    showSad();
	    incorrectSound.play();
	    alert("Time up!");
	    
	    if (wrongGuesses === 3) {
	    	gameOverSound.play();
	    	alert("GAME OVER");
	    	location.reload();
	    }

	    changePokemon();

		$("#user-guess").val("");
	    timerNum = 10;
	    }
	  
	}

//Declare function to check guesses and return result

	function checkGuess(){
		var input = $("#user-guess").val();
		var guess = input.toLowerCase();

		if (guess === randPokemon.pokeName) { 	//guessed right
			
			rightGuesses += 1;
			changeImage("#ball" + rightGuesses, "assets/img/pokeball.png");
			correctSound.play();

			if (rightGuesses === 5) { 			//won game
				winMusic.play();
				alert("You won!!!");
				location.reload();
				
			} else { 							//guessed right but haven't won game yet
				guessedPokemon.push(randPokemon);
				unguessedPokemon.splice(pokemonIndex, 1);
			}

		} else { 								//guessed wrong
			
			wrongGuesses += 1;
			showSad();
			incorrectSound.play();
			alert("Sorry! The correct answer is: " + (randPokemon.pokeName).toUpperCase());

			if (wrongGuesses === 3) {			//lost game

	    	gameOverSound.play();
	    	alert("GAME OVER");
	    	location.reload();

	    	}
  	
		}

		changePokemon();
		$("#user-guess").val("");
		timerNum = 10;

	}

	$("#sad1, #sad2, #sad3").hide();

	changePokemon();

	setInterval(function () {
	  setTimer();
	}, 1000);

	$("#submit-guess").click(checkGuess);


});