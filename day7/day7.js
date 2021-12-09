const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

function average(array) {
	return Math.floor(array.reduce((acc, x) => acc + x, 0) / array.length);
}

function part1(input) {
	const positions = input.split(',').map((x) => parseInt(x, 10));

	const uniquePositions = Array.from(new Set(positions));

	let sum = Infinity;

	for (const uniquePosition of uniquePositions) {
		let currentSum = 0;
		for (const position of positions) {
			currentSum += calculateFuel(position, uniquePosition);
		}

		if (sum > currentSum) {
			sum = currentSum;
		}
	}

	console.log(sum);
}

function part1(input) {
	const positions = input.split(',').map((x) => parseInt(x, 10));

	const uniquePositions = Array.from(new Set(positions));

	const start = Math.min(...uniquePositions);
	const end = Math.max(...uniquePositions);

	let sum = Infinity;

	for (let i = start; i < end; i++) {
		let currentSum = 0;
		for (const position of positions) {
			currentSum += calculateFuel(position, i);
		}

		if (sum > currentSum) {
			sum = currentSum;
		}
	}

	console.log(sum);
}

function part2(input) {
	const positions = input.split(',').map((x) => parseInt(x, 10));

	const uniquePositions = Array.from(new Set(positions));

	const start = Math.min(...uniquePositions);
	const end = Math.max(...uniquePositions);

	let sum = Infinity;

	for (let i = start; i < end; i++) {
		let currentSum = 0;
		for (const position of positions) {
			currentSum += calculateFuel2(calculateFuel(position, i));
		}

		if (sum > currentSum) {
			sum = currentSum;
		}
	}

	console.log(sum);
}

let cache = {};

function calculateFuel2(diff) {
	if (diff === 0) {
		return 0;
	}
	if (diff === 1) {
		return 1;
	}

	if (cache[diff]) {
		return cache[diff];
	}

	const value = calculateFuel2(diff - 1) + diff;

	cache[diff] = value;

	return value;
}

function calculateFuel(initialPosition, finalPosition) {
	return Math.abs(finalPosition - initialPosition);
}

// console.log(calculateFuel2(11));

console.log(part2(input));

// 1 -> 2 -> 3 -> 4 -> 5 -> 6
