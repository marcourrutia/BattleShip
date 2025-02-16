import { useEffect, useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { TURNS, COLUMNS, ROWS, SHIPS } from "./utils/constants";
import { getRandomPosition } from "./utils/gameLogic";

function App() {
  const [turn, setTurn] = useState(TURNS.Player);
  const [playerHit, setPlayerHit] = useState([]);
  const [computerHit, setComputerHit] = useState([]);

  const updateBoard = (position) => {
    if (turn === TURNS.Player) {
      if (!playerHit.includes(position)) {
        setPlayerHit((prev) => [...prev, position]);
        setTurn(TURNS.Computer);
      }
    } else {
      if (!computerHit.includes(position)) {
        setComputerHit((prev) => [...prev, position]);
        setTurn(TURNS.Player);
      }
    }
  };

  useEffect(() => {
    if (turn === TURNS.Computer) {
      setTimeout(() => {
        const position = getRandomPosition(computerHit);
        console.log("posicioon", position);

        if (position) {
          setComputerHit((prev) => [...prev, position]);
          setTurn(TURNS.Player);
        } else {
          console.log("no quedan posiciones");
        }
      }, 1000);
    }
  }, [turn, computerHit]);

  return (
    <>
      <h1 className="text-6xl p-7 text-white/90">Batalla Naval</h1>
      <main className="flex gap-10">
        <div className="flex flex-col">
          <h2 className="text-2xl">Computadora</h2>
          <h1 className="text-4xl p-5">Campo aliado</h1>
          <div className="board-container">
            <div className="header">
              {COLUMNS.map((col, index) => {
                return (
                  <div key={index} className="header-cell">
                    {col}
                  </div>
                );
              })}
            </div>
            <div className="column">
              {ROWS.map((row, index) => {
                return (
                  <div key={index} className="column-cell">
                    {row}
                  </div>
                );
              })}
            </div>
            <section
              className={`board ${
                turn === TURNS.Computer ? "bg-blue-800/20" : ""
              }`}
            >
              {ROWS.map((row, rowIndex) =>
                COLUMNS.map((col, colIndex) => (
                  <Square
                    key={`${rowIndex}-${colIndex}`}
                    position={`${col}${row}`}
                    updateBoard={updateBoard}
                    computerHit={computerHit}
                  />
                ))
              )}
            </section>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl">Jugador</h2>
          <h1 className="text-4xl p-5">Campo rival</h1>
          <div className="board-container">
            <div className="header">
              {COLUMNS.map((col, index) => {
                return (
                  <div key={index} className="header-cell">
                    {col}
                  </div>
                );
              })}
            </div>
            <div className="column">
              {ROWS.map((row, index) => {
                return (
                  <div key={index} className="column-cell">
                    {row}
                  </div>
                );
              })}
            </div>
            <section
              className={`board ${
                turn === TURNS.Player ? "bg-blue-800/20" : ""
              }`}
            >
              {ROWS.map((row, rowIndex) =>
                COLUMNS.map((col, colIndex) => (
                  <Square
                    key={`${rowIndex}-${colIndex}`}
                    position={`${col}${row}`}
                    turn={turn}
                    updateBoard={updateBoard}
                  />
                ))
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
