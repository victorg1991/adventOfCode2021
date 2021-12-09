const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

function parseInput(input) {
	return input.split(',').map((number) => parseInt(number, 10));
}

function calculateLanterfishGenerated(lanterfish, days) {
	let array = [lanterfish];

	for (let i = 0; i < days; i++) {
		console.log(`Day: ${i + 1}`);
		array = array.reduce((acc, x) => {
			if (x === 0) {
				return [...acc, 6, 8];
			}

			return [...acc, x - 1];
		}, []);
	}

	return array.length;
}

function part1(input) {
	let lanterfish = parseInput(input);

	const set = new Set(lanterfish);

	const cache = {};

	for (const entry of set) {
		cache[entry] = calculateLanterfishGenerated(entry, 80);
	}

	return lanterfish.reduce((acc, x) => {
		return acc + cache[x];
	}, 0);
}

function part2(input) {
	const lanterfish = parseInput(input);

	const fish = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	for (const x of lanterfish) {
		fish[x] += 1;
	}

	for (let i = 0; i < 256; i++) {
		const added = fish[0];

		for (let j = 1; j < fish.length; j++) {
			fish[j - 1] = fish[j];
			fish[j] = 0;
		}

		fish[6] += added;
		fish[8] = added;
	}

	return fish.reduce((acc, x) => acc + x, 0);
}

// console.log(part1(input));
console.log(part1(input));
