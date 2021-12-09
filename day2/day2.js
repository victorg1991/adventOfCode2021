const fs = require('fs');
const path = require('path');

const input = fs
	.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8')
	.split('\n');

function part1(moves) {
	const DIRECTIONS = {
		forward: (value, [horizontal, vertical]) => [
			horizontal + value,
			vertical
		],
		up: (value, [horizontal, vertical]) => [horizontal, vertical - value],
		down: (value, [horizontal, vertical]) => [horizontal, vertical + value]
	};

	// horizontal, vertical
	let position = [0, 0];

	for (const move of moves) {
		const [, direction, value] = move.match(/^(forward|up|down) (\d*)/);

		position = DIRECTIONS[direction](parseInt(value, 10), position);
	}

	return position[0] * position[1];
}

function part2(moves) {
	const DIRECTIONS = {
		forward: (value, [horizontal, vertical, aim]) => [
			horizontal + value,
			vertical + value * aim,
			aim
		],
		up: (value, [horizontal, vertical, aim]) => [
			horizontal,
			vertical,
			aim - value
		],
		down: (value, [horizontal, vertical, aim]) => [
			horizontal,
			vertical,
			aim + value
		]
	};

	// horizontal, vertical, aim
	let position = [0, 0, 0];

	for (const move of moves) {
		const [, direction, value] = move.match(/^(forward|up|down) (\d*)/);

		position = DIRECTIONS[direction](parseInt(value, 10), position);
	}

	return position[0] * position[1];
}

console.log(part1(input));
console.log(part2(input));
