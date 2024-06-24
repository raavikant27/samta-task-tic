import useTicTacToe from "../hooks/use-tic-tac-toe";

function TicTacToe() {
  const { board, handleClick, resetGame, getStatusMessage, scores } =
    useTicTacToe();

  return (
    <div className="game">
      <div className="status">
        <div>{getStatusMessage()}</div>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div className="scores">
        <div className="score X">X (Blue): {scores.X}</div>
        <div className="score O">O (Red): {scores.O}</div>
      </div>
      <div className="board">
        {board.map((b, index) => (
          <button
            className={`cell ${b === "X" ? "blue" : b === "O" ? "red" : ""}`}
            key={index}
            onClick={() => handleClick(index)}
            disabled={b !== null}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TicTacToe;
