const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

function invert(binary) {
	return binary
		.split('')
		.map((x) => (x === '0' ? '1' : '0'))
		.join('');
}

function getMostCommonBits(binaries) {
	const sums = [];

	for (let i = 0; i < binaries.length; i++) {
		const binary = binaries[i];

		for (let j = 0; j < binary.length; j++) {
			const currentValue = sums[j] || 0;

			if (binary.charAt(j) === '1') {
				sums[j] = currentValue + 1;
			}
		}
	}

	return sums.map((x) => (x >= binaries.length / 2 ? '1' : '0')).join('');
}

function getMostCommonBitAtPos(numbers, position) {
	return numbers.reduce(
		(acc, x) => acc + parseInt(x.charAt(position), 10),
		0
	) >=
		numbers.length / 2
		? '1'
		: '0';
}

function findNumbersWithBitValueAtPosition(position, value, numbers) {
	return numbers.filter((number) => number.charAt(position) === value);
}

function filterBinaries(numbers, position, mostCommonBit) {
	let commonBit = getMostCommonBitAtPos(numbers, position);

	if (!mostCommonBit) {
		commonBit = invert(commonBit);
	}

	if (numbers.length === 1) {
		return numbers.pop();
	}

	return filterBinaries(
		findNumbersWithBitValueAtPosition(position, commonBit, numbers),
		position + 1,
		mostCommonBit
	);
}

function part1(binaries) {
	const gamma = getMostCommonBits(binaries);

	const epsilon = invert(gamma);

	return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function part2(binaries) {
	const oxygenGeneratorRating = filterBinaries(binaries, 0, true);
	const co2ScrubberRating = filterBinaries(binaries, 0, false);

	return parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2);
}

console.log(part1(input));
console.log(part2(input));
