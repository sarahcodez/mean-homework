var ask = require('readline-sync');

var ships = 0;
var hits = 0;
var threeSunk = false;
var guesses = 0;

var locationObj = function() {   //don't use reserve word location
	this.ship = false;
	this.hit = false;
	this.miss = false;
};

function generateGrid(row, col) {
	var grid = [];

	for (var x = 0; x < row; x++) {
		grid.push([]);

		for (var y = 0; y < col; y++) {
			grid[x][y] = new locationObj();
		}

	}

	return grid;
}

function generateShips(grid) {
	while(ships < 3) {

		for (var x = 0; x < grid.length; x++) {
    	
	    	for (var y = 0; y < grid.length; y++) {
	      		var oneInFive = Math.floor(Math.random() * 5);

	    		if (oneInFive === 1) {
	    			grid[x][y].ship = true;
	    			ships += 1;
	    		}
	    	}
		
		}
	
	}
}

function printGrid(grid) {
	console.log('  0 1 2 3 4 5 6 7 8 9 ');

  	for (var x = 0; x < grid.length; x++) {       //make rows
    	var rowArray = [];

    	for (var y = 0; y < grid.length; y++) {     //make columns
      		var position = grid[x][y];

    		if (position.hit === true) {
    			rowArray.push('X');
    		} else if (position.miss === true) {
    			rowArray.push('M');
    		} else {
    			rowArray.push('_');
    		}

    	}

    	console.log(x + " " + rowArray.join(" "));
  	}
}

var battleshipGrid = generateGrid(10,10); //Array of objects representing coordinates and their properties

generateShips(battleshipGrid); //Place ships on grid

console.log('\nPlay Battleship! See how quickly you can sink three ships!\n');

while(threeSunk == false) {

	printGrid(battleshipGrid); //Visual representation of grid

	var guess = ask.question('\nEnter a row and column like this \'0,3\' (row 0, column 3): ');

	var rowGuess = parseInt(guess);
	var indexComma = guess.indexOf(',');
	var colGuess = parseInt(guess.substr(indexComma + 1));

	if (rowGuess >= 0 && rowGuess <= 9 && indexComma > -1 && colGuess >= 0 && colGuess <= 9) {
		guesses += 1;

		if (battleshipGrid[rowGuess][colGuess].ship === true) {
			hits += 1;
			battleshipGrid[rowGuess][colGuess].hit = true;
			console.log('\nHIT!!!\n');

			if (hits === 3) {
				threeSunk = true;
				console.log('\nYou sank all three ships!!!\n');
			}
			
		} else {
			battleshipGrid[rowGuess][colGuess].miss = true;
			console.log('\nYou missed!\n');
		}
		
	} else {
		console.log('\nPlease enter a valid row and column number separated by a comma.\n');
	}

}

printGrid(battleshipGrid);

var stats = "You took " + guesses + " guesses to sink all three battleships. " + 
	"Shooting Accuracy: " + ((3 / guesses) * 100) + "%";

console.log (stats);


