var text = "";

for (i = 1; i < 16; i++) {
	texconsole.log(text + i);
	if(i % 2 === 0) {
		console.log(text + "*");
	}
}