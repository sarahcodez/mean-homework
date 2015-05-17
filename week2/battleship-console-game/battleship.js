var ask = require('readline-sync');

var playAgain = true;

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

    	console.log(x + ' ' + rowArray.join(' '));
  	}
}

while (playAgain === true) {

	var ships = 0;
	var hits = 0;
	var threeSunk = false;
	var guesses = 0;
	var location1;
	var location2;

	var battleshipGrid = generateGrid(10,10); //Array of objects representing coordinates and their properties

	generateShips(battleshipGrid); //Place ships on grid

	console.log('\nPlay Battleship! See how quickly you can sink three ships!\n');

	while(threeSunk === false) {

		printGrid(battleshipGrid); //Visual representation of grid

		var guess = ask.question('\nEnter a row and column like this \'0,3\' (row 0, column 3): ');

		var rowGuess = parseInt(guess);
		var indexComma = guess.indexOf(',');
		var colGuess = parseInt(guess.substr(indexComma + 1));
		var guessPoint = battleshipGrid[rowGuess][colGuess];

		if (rowGuess >= 0 && rowGuess <= 9 && indexComma > -1 && colGuess >= 0 && colGuess <= 9) { //confirm that guess is a valid value
			guesses += 1;

			if (guessPoint.ship === true) {

				if (hits > 0 && (guessPoint === location1 || guessPoint === location2)) { //confirm that user has not already hit that location
					console.log('\nYou already hit that ship!\n');
				} else {
					hits += 1;
					guessPoint.hit = true;
					console.log('\nHIT!!!\n');

					if (hits === 1) {
						location1 = guessPoint;
					} else if (hits === 2) {
						location2 = guessPoint;
					} else { // hits === 3
						threeSunk = true;
						console.log('Three ships sunk! YOU WON THE GAME!!!\n');

						printGrid(battleshipGrid);
						
						var stats = '\nIt took you ' + guesses + ' guesses to sink all three battleships. \n' + 
							'Shooting Accuracy: ' + Math.round((3 / guesses) * 100) + '%';
						console.log (stats);
					}
				
				}
				
			} else {
				guessPoint.miss = true;
				console.log('\nYou missed!\n');
			}
			
		} else {
			console.log('\nPlease enter a valid row and column number separated by a comma.\n');
		}

	}

	var validYN = false;
	var againYN;

	while (validYN === false) {
		againYN = ask.question('\nPlay again? (Y/N) ');
		var againYNCaps = againYN.toUpperCase();

		if (againYNCaps.indexOf('Y') > -1) {
			validYN = true;
		} else if (againYNCaps.indexOf('N') > -1) {
			validYN = true;
			playAgain = false;
		} else {
			console.log('\nPlease enter Y to play again or N to exit.');
		}
	}

}

console.log('\nThank you for playing Battleship!\n');