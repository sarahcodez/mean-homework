//Simple calculator program that accepts input from the user in the command line

var ask = require('readline-sync');

console.log('Welcome to BasiCalc--a calculator that can perform addition(+), subtraction(-), multiplication(*) or division(/) on two numbers.');
var mathInput = ask.question('Enter a mathematical operation like 3*4: ');

var num1 = parseInt(mathInput);

//Thanks to Erik for helping me refactor my code using search() and match() with RegExp
var operatorPos = mathInput.search(/[\+\-\*\/]/); // Searches for any of the operators. The / keeps regX from interpreting the mathSymbols as something else
var operator = mathInput.match(/[\+\-\*\/]/); // Returns the operator as an array (e.g. ["+"])
var num2String = mathInput.substr((operatorPos + 1));
var num2 = parseInt(num2String);

function addNum(x,y) {
	return x + y;
}

function subNum(x,y) {
	return x - y;
}

function multNum(x,y) {
	return x * y;
}

function divNum(x,y) {
	return x / y;
}


if (operatorPos !== -1) {

	if (operator[0] === '+') {
		var mathResult = addNum(num1,num2);
	} else if (operator[0] === '-') {
		var mathResult = subNum(num1,num2);
	} else if (operator[0] === '*') {
		var mathResult = multNum(num1,num2);
	} else if (operator[0] === '/') {
		var mathResult = divNum(num1,num2);
	}
	
	console.log(mathResult);

} else {
	console.log('The calculator did not detect +, -, * or / in your entry.');
}
