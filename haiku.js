var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file) {
	return fs.readFileSync(file).toString();
}

// formats cmu dictionary into object with word: phoneme key-value pairs

function formatData(data) {
	var lines = data.toString().split("\n"), lineSplit, words = {};
	lines.forEach(function(line) {
		lineSplit = line.split("  ");
		words[lineSplit[0]] = lineSplit[1];
	});
	return words;
}

var dict = formatData(cmudictFile);

// sort word 'dictionary' into syllables array

function makeSyllablesArr(dictionary) {
	var output = [], re = /\d/g, syllableCount;

	for (var word in dictionary) {
		syllableCount = String(dictionary[word]).match(re);
		syllableCount = syllableCount !== null ? syllableCount.length : 0;
		if (output[syllableCount] === undefined) {
			output[syllableCount] = [word];
		} else {
			output[syllableCount].push(word);
		}
	}

	return output;
}

var syllablesArr = makeSyllablesArr(dict);

function findRandomWord(index) {
	var len = syllablesArr[index].length;
	var num = Math.floor(Math.random() * len);
	return syllablesArr[index][num];
}

function generateRandomNum(max) {
	return Math.floor(Math.random() * max) + 1;
}

function createHaiku(structure) {
	var x, temp;
	if (structure.length === 0) {
		console.log("And now for some randomness:")
		for (var i = 0; i < 3; i++) {
			if (i % 2 === 0) {
				x = 5;
			} else {
				x = 7;
			}
			while (x > 0) {
				temp = generateRandomNum(x);
				structure.push(temp);
				x -= temp;
			}
		}
	}
	var output = [], count = 0;
	structure.forEach(function(phrase) {
		output.push(findRandomWord(phrase))
		count += phrase;
		if (count === 5 || count === 12 || count === 17) {
			console.log(output.join(" "));
			output = [];
		}
	});
	console.log("");
}

module.exports = {
	createHaiku: createHaiku
};