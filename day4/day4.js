const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

class Board {
	static DIMENSION = 5;

	#numbers;

	constructor(numbers) {
		this.#numbers = numbers;
	}

	checkWin(drawValues) {
		// Rows
		for (let i = 0; i < Board.DIMENSION; i++) {
			let marked = 0;

			for (let j = 0; j < Board.DIMENSION; j++) {
				if (drawValues.has(this.#numbers[i * Board.DIMENSION + j])) {
					marked += 1;
				}
			}

			if (marked === Board.DIMENSION) {
				return true;
			}
		}

		// Columns
		for (let i = 0; i < Board.DIMENSION; i++) {
			let marked = 0;

			for (let j = 0; j < Board.DIMENSION; j++) {
				if (drawValues.has(this.#numbers[j * Board.DIMENSION + i])) {
					marked += 1;
				}
			}

			if (marked === Board.DIMENSION) {
				return true;
			}
		}

		return false;
	}

	getUnmarkedValues(drawValues) {
		return this.#numbers.filter((number) => !drawValues.has(number));
	}

	drawColumns() {
		for (let i = 0; i < Board.DIMENSION; i++) {
			for (let j = 0; j < Board.DIMENSION; j++) {
				process.stdout.write(
					this.#numbers[Board.DIMENSION * j + i].padStart(2, ' ') +
						' '
				);
			}
			process.stdout.write('\n');
		}
	}

	drawBoard(drawValues) {
		for (let i = 0; i < Board.DIMENSION; i++) {
			for (let j = 0; j < Board.DIMENSION; j++) {
				process.stdout.write(
					drawValues.has(this.#numbers[i * Board.DIMENSION + j])
						? this.#numbers[i * Board.DIMENSION + j] + '* '
						: this.#numbers[i * Board.DIMENSION + j] + ' '
				);
			}

			process.stdout.write('\n');
		}
	}
}

function parseInput(input) {
	const [drawOrder, ...rest] = input.split('\n\n');

	const boards = rest.map((x) =>
		x
			.split('\n')
			.reduce(
				(acc, x) => [...acc, ...x.split(' ').filter((x) => x !== '')],
				[]
			)
	);

	return {
		drawOrder: drawOrder.split(','),
		boards: boards.map((x) => new Board(x))
	};
}

function part1(input) {
	const {drawOrder, boards} = parseInput(input);

	const drawn = new Set();

	for (const draw of drawOrder) {
		drawn.add(draw);

		const winnerBoard = boards.find((board) => board.checkWin(drawn));

		if (winnerBoard) {
			const sum = winnerBoard
				.getUnmarkedValues(drawn)
				.map((x) => parseInt(x, 10))
				.reduce((acc, x) => acc + x, 0);

			return sum * draw;
		}
	}
}

function part2(input) {
	const {drawOrder, boards} = parseInput(input);

	const drawn = new Set();

	let currentBoards = boards;

	for (const draw of drawOrder) {
		drawn.add(draw);

		if (currentBoards.length !== 1) {
			currentBoards = boards.filter((board) => !board.checkWin(drawn));
		} else if (currentBoards[0].checkWin(drawn)) {
			const sum = currentBoards
				.pop()
				.getUnmarkedValues(drawn)
				.map((x) => parseInt(x, 10))
				.reduce((acc, x) => acc + x, 0);

			return sum * draw;
		}
	}
}

console.log(part1(input));
console.log(part2(input));
