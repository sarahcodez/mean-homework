var ask = require('readline-sync');
var name = ask.question('Hello, human! My name is GROK. What your name? ');
var nameUpper = name.toUpperCase();

console.log(nameUpper + ', you play Rock, Paper, Scissors with GROK, okay?');
console.log('Rock crush scissors. Scissors cut paper. Paper give rock a really bad papercut.');

var input = ask.question(nameUpper + ' choose. Rock, Paper, or Scissors (GROK no cheat...promise): ');
var userPlay = input.toUpperCase();

while ((userPlay !== 'ROCK') && (userPlay !== 'PAPER') && (userPlay !== 'SCISSORS')) {
	var newInput = ask.question('Grok no understand. Choose ROCK, PAPER, or SCISSORS. PLEASE. Grok want to play: ');
	var userPlay = newInput.toUpperCase();
} 
console.log(nameUpper + ' choose ' + userPlay + '.');

var grokPlay = Math.random();

if (grokPlay <= 0.33) {
	grokPlay = 'ROCK';
} else if (grokPlay > 0.33 && grokPlay <= 0.66) {
	grokPlay = 'PAPER';
} else {
	grokPlay = 'SCISSORS';
}

console.log('GROK choose ' + grokPlay + '.');

var tie = 'Tie! We both very good.';
var userWin = nameUpper + ' win! You good at this. Grok practice more.';
var grokWin = 'Grok win! ' + nameUpper + ' practice more, okay?';

function compare(user, computer) {
	if (user === computer) {
		return tie;
	} 

	else if (user === 'ROCK') {
		if (computer === 'SCISSORS') {
			return userWin;
		} else {
			return grokWin;
		}
	} 

	else if (user === 'SCISSORS') {
		if (computer === 'ROCK') {
			return grokWin;
		} else {
			return userWin;
		}
	}

	else if (user === 'PAPER') {
		if (computer === 'ROCK') {
			return userWin;
		} else {
			return grokWin;
		}
	}

	else {
		return "Error!"
	}
}

var output = compare(userPlay, grokPlay);
console.log(output);