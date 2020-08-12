const isValidSudoku = (board) => {
	const validNums = '123456789'.split('');
	const isValidRow = (row) => {
		const rowNums = board[row].filter((el) => el !== '.');
		return rowNums.every((el) => validNums.indexOf(el) !== -1) && new Set(rowNums).size === rowNums.length;
	};
	const isValidCol = (col) => {
		const colNums = board.map((el) => el[col]).filter((el) => el !== '.');
		return colNums.every((el) => validNums.indexOf(el) !== -1) && new Set(colNums).size === colNums.length;
	};
	const isValidSquare = () => {
		for (let row = 0; row < 9; row += 3) {
			for (let col = 0; col < 9; col += 3) {
				let squareNums = [];

				for (let r = row; r < row + 3; r++) {
					for (let c = col; c < col + 3; c++) {
						if (board[r][c] === '.') {
							continue;
						}
						if (validNums.indexOf(board[r][c]) === -1) {
							return false;
						}
						squareNums.push(board[r][c]);
					}
				}
				if (new Set(squareNums).size !== squareNums.length) {
					return false;
				}
			}
		}
		return true;
	};
	if (!isValidSquare()) {
		return false;
	}
	for (let i = 0; i < 9; i++) {
		if (!isValidCol(i) || !isValidRow(i)) {
			return false;
		}
	}

	return true;
};

const solveSudoku = (pazzle) => {
	const board = JSON.parse(JSON.stringify(pazzle));
	const solve = () => {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (board[row][col] === '.') {
					for (let num = 1; num < 10; num++) {
						board[row][col] = num.toString();
						if (isValidSudoku(board)) {
							if (solve()) {
								return true;
							}
							board[row][col] = '.';
						} else {
							board[row][col] = '.';
						}
					}
					return false;
				}
			}
		}
		return true;
	};
	solve();
	return board;
};

const Sudoku = { solve: solveSudoku, valid: isValidSudoku };
export default Sudoku;
