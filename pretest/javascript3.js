function Person(name, age, height, hometown) {
	this.name = name;
	this.age = age;
	this.height = height;
	this.hometown = hometown;
}

//make this a protype method for Person

for (var property in Person) {
	console.log(property + ": " + Person[property]);
}