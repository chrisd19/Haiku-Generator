var fs = require('fs');
var cmudictFile = readFile('./cmudict.txt');
var sherlockFile = readFile('./sherlock.txt')


function readFile(file) {
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


function numSyllables(word) {
	for (var i = 0; i < syllablesArr.length; i++) {
		if (Array.isArray(syllablesArr[i])) {
			if (syllablesArr[i].indexOf(word.toUpperCase()) > -1) {
				return i;
			}
		}
	}
	return undefined;
}

// not yet working extra-credit function

// function findBookHaiku(structure) {
// 	var formatted = sherlockFile.toString().split(/\s/);
// 	var output = [], temp, count;
// 	for (var i = 0, x = formatted.length; i < x; i++) {
// 		for (var k = 0; k < 3; k++) {
// 			if (numSyllables(formatted[i]) === structure[k][0]) {
// 				temp = [formatted[i]];
// 				for (var j = 1; j < structure[0].length; j++) {
// 					if (numSyllables(formatted[i+j]) === structure[0][j]) {
// 						temp.push(formatted[i+j]);
// 					} else {
// 						break;
// 					}
// 				}
// 				if (temp.length === structure[0].length) {
// 					output.push(temp.join(" "));
// 				}
// 			}
// 		}
// 		if (output.length === 3) {
// 			console.log(output.join("\n"));
// 			break;
// 		}
// 	}
// 	console.log("No matches in this book for that structure.");
// }

module.exports = {
	createHaiku: createHaiku
};