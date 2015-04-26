$(document).ready(function() {

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

	var unguessedPokemon = [bulbasaur, ivysaur, venusaur, charmander, charmeleon, charizard, 
		squirtle, wartortle, blastoise, caterpie, metapod, butterfree, weedle, kakuna, 
		beedrill, pidgey, pidgeotto, pidgeot, rattata, raticate];

	var wrongGuesses = 0;
	var rightGuesses = 0;
	var guessedPokemon = [];
	var pokemonImage = $('#pokemon-img');
	var ball; //rightGuesses
	var sad; //wrongGuesses
	var pokemonIndex;
	var timerNum = 10;

	var correctSound = new Audio("assets/audio/correct_guess.wav");
	var incorrectSound = new Audio("assets/audio/incorrect_guess.wav");
	var winMusic = new Audio("assets/audio/win_music.wav");
	var gameOverSound = new Audio("assets/audio/game_over.wav");

	var getRandPokemon = function() {
		pokemonIndex = Math.floor(Math.random() * unguessedPokemon.length);
		return unguessedPokemon[pokemonIndex];
	};

	function showSad() {

		sad = $("#sad" + wrongGuesses);
		sad.show();
		// ball = $('#ball' + rightGuesses);
		// changeImage(ball, "assets/img/pokeball.png");
	}

	$("#sad1, #sad2, #sad3").hide();

	var randPokemon = getRandPokemon(); //turn into while loop? (gameplay)
	changeImage(pokemonImage, randPokemon.pokeFile);

	var timer = setInterval(function () {
	  setTimer();
	}, 1000);

	function setTimer() {
	    
	    var newNum;

		if (timerNum >= 10) {
	      newNum = "0:" + timerNum;
	    } else {
	      newNum = "0:0" + timerNum;
	    }

	    timerNum--;	  
		document.getElementById("timer").innerHTML = newNum;
		//$("#timer").html(newTime);
	  
	    if(timerNum < 0) { // || submit button is clicked
	    incorrectSound.play();
	    wrongGuesses += 1;
	    alert("Time over! Try again!");
	    showSad();

	    if (wrongGuesses === 3) {
	    	gameOverSound.play();
	    	alert("GAME OVER");
	    	wrongGuesses = 0;
	    	location.reload();
	    }

		//refactor as reset
		randPokemon = getRandPokemon();
		changeImage(pokemonImage, randPokemon.pokeFile);

		$("#user-guess").val("");
	    timerNum = 10;
	    }
	  
	}


	function changeImage(curImgID, newImg) { //refactor like showSad as showBall if not reused
		curImgID.attr('src', newImg);
	}	

	function checkGuess(){
		var input = $("#user-guess").val();
		var guess = input.toLowerCase();

		if (guess === randPokemon.pokeName) {
			
			rightGuesses += 1;
			ball = $('#ball' + rightGuesses);
			changeImage(ball, "assets/img/pokeball.png");
			correctSound.play();

			if (rightGuesses === 5) {
				winMusic.play();
				alert("You won!!!");
				rightGuesses = 0;
				location.reload();
				
			} else { //guessed right but didn't win yet
				guessedPokemon.push(randPokemon);
				unguessedPokemon.splice(pokemonIndex, 1);
			}


		} else {
			
			incorrectSound.play();
			wrongGuesses += 1;
			showSad();

			if (wrongGuesses === 3) {
	    	gameOverSound.play();
	    	alert("GAME OVER");
	    	wrongGuesses = 0;
	    	location.reload();
	    	}

	    	alert("Try again!");

		}

		randPokemon = getRandPokemon();
		changeImage(pokemonImage, randPokemon.pokeFile);

		$("#user-guess").val("");
		timerNum = 10;

	}

//var timerNum = 10; (moved above)

	

	$("#submit-guess").click(checkGuess);


});

