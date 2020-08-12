import React, { useState } from 'react';

import Sudoku from '../../logic/solver';

const Board = () => {
	//init 2 dim array 9 by 9 filled by '.'
	const initArray = [...Array(9)].map(() => new Array(9).fill('.'));

	const [board, setBoard] = useState(initArray);

	const validNums = '.123456789'.split('');

	const HandleInput = (event, row, col) => {
		const val = event.target.value.split('');
		if (val.every((el) => validNums.indexOf(el) !== -1)) {
			const newBoard = JSON.parse(JSON.stringify(board));
			newBoard[row][col] = val[val.length - 1];
			setBoard(newBoard);
		}
	};

	const HandleSet = (event) => {
		const solve = Sudoku.solve(board);
		setBoard(solve);
	};

	const handleReset = (event) => {
		setBoard(initArray);
	};

	const cells = board.map((row, i) => {
		return (
			<div className="row" key={'row-' + i}>
				{row.map((el, j) => {
					return <input type="text" className="cell" value={board[i][j]} key={i + j} onChange={(e) => HandleInput(e, i, j)} />;
				})}
			</div>
		);
	});
	return (
		<div className="board">
			{cells}
			<div className="board__btns">
				<button onClick={HandleSet}>Set</button>
				<button onClick={handleReset}>Reset</button>
			</div>
		</div>
	);
};

export default Board;
