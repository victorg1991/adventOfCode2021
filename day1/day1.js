const fs = require('fs');

const input = fs
	.readFileSync('./input.txt', 'utf-8')
	.split('\n')
	.filter(Number)
	.map(Number);

function part1(input) {
	const [solution] = input.reduce(
		([increments = 0, previousNumber], num) => [
			previousNumber && num > previousNumber
				? increments + 1
				: increments,
			num
		],
		[]
	);

	return solution;
}

function part2(input) {
	const sum = (array) => array.reduce((acc, x) => x + acc, 0);

	const sums = [];

	for (let i = 0; i < input.length - 3; i++) {
		sums[i] = sum(input.slice(i, i + 3));
	}

	const [solution] = sums.reduce(
		([increments = 0, previousNumber], num) => [
			previousNumber && num > previousNumber
				? increments + 1
				: increments,
			num
		],
		[]
	);

	return solution;
}

console.log(part1(input));
console.log(part2(input));
