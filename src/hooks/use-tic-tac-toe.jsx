import { useState, useEffect } from "react";

const useTicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("scores"));
    if (savedScores) {
      setScores(savedScores);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  const handleClick = (index) => {
    const newBoard = board.slice();
    if (calculateWinner(board) || board[index]) {
      return;
    }
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    const winner = calculateWinner(newBoard);
    if (winner) {
      setScores((prevScores) => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1,
      }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every(Boolean)) {
      return "It's a draw!";
    } else {
      return `Next player: ${xIsNext ? "X" : "O"}`;
    }
  };

  return {
    board,
    handleClick,
    resetGame,
    getStatusMessage,
    scores,
  };
};

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default useTicTacToe;
