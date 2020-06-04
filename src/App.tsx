import React, { useState } from 'react';
import './App.css';

enum Cell {
  None = 0,
  One = 1,
  Two = 2,
}

type Board = Cell[][];

const initializeBoard = () => {
  const board = [];

  for (let i = 0; i < 15; i++) {
    board.push(Array(15).fill(Cell.None));
  }

  return board;
};

function App() {
  const [board, setBoard] = useState<Board>(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Cell>(Cell.One);

  const checkGame = () => {
    let startRow = 0;
    let startCol = 0;

    for (let endRow = 4; startRow < 11; endRow++, startRow++) {
      startCol = 0;
      for (let endCol = 4; startCol < 11; startCol++, endCol++) {
        let whoWins = Cell.None;

        // horizontal
        console.log(startRow, startCol, endRow, endCol);
        for (let row = startRow; row <= endRow; row++) {
          let col = startCol;
          for (; col <= endCol; col++) {
            // console.log('>', row, col);
            if (board[row][col] !== currentPlayer) {
              whoWins = Cell.None;
              break;
            }
          }
          // console.log(col);
          if (col === endCol + 1) {
            whoWins = board[row][startCol];
            alert(`Player ${whoWins} Wins!`);
            // setBoard(initializeBoard());
            return;
          }
        }

        // vertical
        for (let col = startCol; col <= endCol; col++) {
          let row = startRow;
          for (; row <= endRow; row++) {
            if (board[row][col] !== currentPlayer) {
              whoWins = Cell.None;
              break;
            }
          }

          if (row === endRow + 1) {
            whoWins = board[row][startCol];
            alert(`Player ${whoWins} Wins!`);
            // setBoard(initializeBoard());
            return;
          }
        }

        // diagonal left -> right
        let row = startRow;
        for (let col = startCol; row <= endRow && col <= endCol; row++, col++) {
          if (board[row][col] !== currentPlayer) {
            whoWins = Cell.None;
            break;
          }
        }

        if (row === endRow + 1) {
          whoWins = board[row][startCol];
          alert(`Player ${whoWins} Wins!`);
          // setBoard(initializeBoard());
          return;
        }

        // diagonal right -> left
        row = startRow;
        for (let col = endCol; row <= endRow && col >= startCol; row++, col--) {
          if (board[row][col] !== currentPlayer) {
            whoWins = Cell.None;
            break;
          }
        }

        if (row === endRow + 1) {
          whoWins = board[startRow][startCol];
          alert(`Player ${whoWins} Wins!`);
          // setBoard(initializeBoard());
          return;
        }
      }
    }
  };

  const makeMove = (row: number, col: number) => {
    console.log(row, col);
    const newBoard = [...board];
    if (newBoard[row][col] === Cell.None) {
      newBoard[row][col] = currentPlayer;
      setBoard(newBoard);
      checkGame();
      setCurrentPlayer(currentPlayer === Cell.One ? Cell.Two : Cell.One);
    } else {
      alert('Already Filled!');
    }
  };

  const renderCells = () => {
    return board.map((row, rowIndex) =>
      row.map((cell, colIndex) => renderCell({ cell, rowIndex, colIndex })),
    );
  };

  const renderCell = ({
    cell,
    rowIndex,
    colIndex,
  }: {
    cell: Cell;
    rowIndex: number;
    colIndex: number;
  }) => {
    return (
      <div
        className='cell'
        style={{
          backgroundColor:
            cell === Cell.One ? 'yellow' : cell === Cell.Two ? 'red' : 'white',
        }}
        key={`${cell}${rowIndex}-${colIndex}`}
        onClick={() => makeMove(rowIndex, colIndex)}></div>
    );
  };

  return (
    <div className='App'>
      <div className='board'>{renderCells()}</div>
    </div>
  );
}

export default App;
