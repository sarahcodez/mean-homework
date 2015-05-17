
function Pokemon(pokeName, pokeId) {
	this.pokeName = pokeName;
	this.pokeId = pokeId;
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

var pokeArray = [bulbasaur, ivysaur, venusaur, charmander, charmeleon, charizard, squirtle, wartortle, blastoise, caterpie, metapod, butterfree, weedle, kakuna, beedrill, pidgey, pidgeotto, pidgeot, rattata, raticate];

module.exports = pokeArray; //createPokeArray;