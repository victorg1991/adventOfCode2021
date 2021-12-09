const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

function parseInput(input) {
	return input.split('\n').map((line) => {
		const [, ...rest] = line.match(/(\d+),(\d+) -> (\d+),(\d+)/);

		const [x1, y1, x2, y2] = rest.map((x) => parseInt(x, 10));

		return {x1, y1, x2, y2, line};
	});
}

function addPoints({x1, y1, x2, y2, line}, map) {
	let start,
		end,
		sum = 0;

	console.log('line: ', line);

	if (x1 === x2) {
		start = Math.min(y1, y2);
		end = Math.max(y1, y2);

		console.log('line: ', line);

		for (let i = start; i <= end; i++) {
			const value = map[i][x1] ?? 0;

			// console.log(`checking value: ${x1}, ${i}`);

			map[i][x1] = value + 1;

			if (map[i][x1] === 2) {
				sum++;
			}
		}
	} else if (y1 === y2) {
		// console.log(x1, x2);

		start = Math.min(x1, x2);
		end = Math.max(x1, x2);

		// console.log(start, end);

		for (let i = start; i <= end; i++) {
			const value = map[y1][i] ?? 0;

			// console.log(`checking value: ${i}, ${y1}`);

			map[y1][i] = value + 1;

			if (map[y1][i] === 2) {
				sum++;
			}
		}
	} else {
		let [startX, startY] = y1 < y2 ? [x1, y1] : [x2, y2];
		let [endX, endY] = y1 < y2 ? [x2, y2] : [x1, y1];

		for (let i = 0; i <= endY - startY; i++) {
			const vertical = startY + i;
			const horizontal = startX < endX ? startX + i : startX - i;

			const value = map[vertical][horizontal] ?? 0;

			map[vertical][horizontal] = value + 1;

			if (map[vertical][horizontal] === 2) {
				sum++;
			}
		}
	}

	return sum;
}

function part1(input) {
	const array = Array.from({length: 1000}, (x) => []);
	const segments = parseInput(input);

	return segments.reduce(
		(acc, segment) => addPoints(segment, array) + acc,
		0
	);
}

console.log(part1(input));
// console.log(part2(input));
