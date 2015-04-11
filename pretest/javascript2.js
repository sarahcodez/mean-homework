var text = "";

for (i = 1; i < 16; i++) {
	text += " " + i;
	if(i % 2 === 0) {
		text += "*";
	}
}

console.log(text);