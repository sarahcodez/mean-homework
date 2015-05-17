//Main code to run when page loads

$(function() {
	
	$("#sad1, #sad2, #sad3").hide();

	changePokemon(guessedPokemon);

	startCountdown();

	$("#submit-guess").click(processGuess);

});

//Declare global variables

var guessedPokemon = [];

var pokeId;

var wrongGuesses = 0;
var rightGuesses = 0;

var correctSound = new Audio("assets/audio/correct_guess.wav");
var incorrectSound = new Audio("assets/audio/incorrect_guess.wav");
var winMusic = new Audio("assets/audio/win_music.wav");
var gameOverSound = new Audio("assets/audio/game_over.wav");

var timer;
var timerNum = 10;

//Declare function to change images of guess pokemon and pokeballs

function changeImage(currentImgID, newImg) {
 	$(currentImgID).attr("src", newImg);
}

//Declare function to switch pokemon

function changePokemon(guessedArray) {
		
	$.ajax("/pokemon", {
		method: "POST",
		processData: false,
		contentType: "application/json",
		data: JSON.stringify({guessed: guessedArray})
	})
	.done(function(data) {
		var newPokeObj = JSON.parse(data);
		pokeId = newPokeObj.pokeId;

		var pokeImg = newPokeObj.pokeImg;
		changeImage("#pokemon-img", pokeImg);
	})
	.fail(function(error) {
		console.log(error);
	});

}	

//Declare functions to check and process guess

function processGuess(){

	stopCountdown();
	var input = $("#user-guess").val();
	var guess = input.toLowerCase();

	if(pokeId) { 		//make sure pokeId is stored

		checkGuess(guess);
		$("#user-guess").val("");
		timerNum = 10;
		startCountdown();

	}

}

function checkGuess(userGuess) {

	$.ajax("/guess", {
		method: "POST",
		processData: false,
		contentType: "application/json",
		data: JSON.stringify({guess: userGuess, pokeId: pokeId})
	})
	.done(function(data) {
		var responseObj = JSON.parse(data);
		var guessResult = responseObj.correct;
	
		if (guessResult) {
			isCorrect(pokeId, guessedPokemon);
		} else {
			isIncorrect();
		}

		changePokemon(guessedPokemon);
	})
	.fail(function(error) {
		console.log(error);
	});

}

function isCorrect(id, guessedArray) {

	rightGuesses += 1;
	changeImage("#ball" + rightGuesses, "assets/img/pokeball.png");
	correctSound.play();
	guessedArray.push(id);

	if (rightGuesses === 5) { 	//won game

		winMusic.play();
		alert("You won!!!");
		location.reload();
		
	}
	
}

function isIncorrect() {

	wrongGuesses += 1;
	showSad();
	incorrectSound.play();
	alert("Try again!");

	if (wrongGuesses === 3) {	//lost game

    	gameOverSound.play();
    	alert("GAME OVER");
    	location.reload();

	}
}

function showSad() {
	$("#sad" + wrongGuesses).show();
}

//Timer functions

function startCountdown() {
	timer = setInterval(function () {
		setTimer();
	}, 1000);
}

function stopCountdown() {
	clearInterval(timer);
}

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
    	processGuess();
    }
  
}
