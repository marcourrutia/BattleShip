import { useEffect, useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { TURNS, COLUMNS, ROWS, SHIPS } from "./utils/constants";
import {
  getRandomPosition,
  createShips,
  positionShips,
} from "./utils/gameLogic";

function App() {
  const [turn, setTurn] = useState(TURNS.Player);
  const [playerHit, setPlayerHit] = useState([]);
  const [computerHit, setComputerHit] = useState([]);
  const [playerPosition, setPlayerPosition] = useState([]);
  const [computerPosition, setComputerPosition] = useState([]);

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
    const playerShip = positionShips(createShips());
    const computerShip = positionShips(createShips());
    setPlayerPosition(playerShip.flat());
    setComputerPosition(computerShip.flat());
  }, []);

  useEffect(() => {
    if (turn === TURNS.Computer) {
      setTimeout(() => {
        const position = getRandomPosition(computerHit);

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
    <main className="w-fit">
      <h1 className="text-4xl 2xl:text-6xl pb-2 2xl:p-7 text-white/90">
        Batalla Naval
      </h1>
      {playerPosition.length > 0 && computerPosition.length > 0 ? (
        <main className="flex flex-col lg:flex-row gap-20 w-fit place-items-center">
          <div className="flex flex-col">
            <h2 className="text-1xl 2xl:text-2xl">Computadora</h2>
            <h1 className="text-2xl 2xl:text-4xl p-5">Campo aliado</h1>
            <div className="grid grid-cols-[40px_425px] 2xl:grid-cols-[50px_575px]">
              <div className="header">
                {COLUMNS.map((col, index) => {
                  return (
                    <div
                      key={index}
                      className="header-cell size-[35px] 2xl:size-[50px]"
                    >
                      {col}
                    </div>
                  );
                })}
              </div>
              <div className="column">
                {ROWS.map((row, index) => {
                  return (
                    <div
                      key={index}
                      className="column-cell size-[35px] 2xl:size-[50px]"
                    >
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
                      key={`${col}${row}`}
                      id="player"
                      position={`${col}${row}`}
                      updateBoard={updateBoard}
                      computerHit={computerHit}
                      shipsPosition={playerPosition}
                    />
                  ))
                )}
              </section>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-1xl 2xl:text-2xl">Jugador</h2>
            <h1 className="text-2xl 2xl:text-4xl p-5">Campo rival</h1>
            <div className="grid grid-cols-[40px_425px] 2xl:grid-cols-[50px_575px]">
              <div className="header">
                {COLUMNS.map((col, index) => {
                  return (
                    <div
                      key={index}
                      className="header-cell size-[35px] 2xl:size-[50px]"
                    >
                      {col}
                    </div>
                  );
                })}
              </div>
              <div className="column">
                {ROWS.map((row, index) => {
                  return (
                    <div
                      key={index}
                      className="column-cell size-[35px] 2xl:size-[50px]"
                    >
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
                      key={`${col}${row}`}
                      id="computer"
                      position={`${col}${row}`}
                      turn={turn}
                      shipsPosition={computerPosition}
                      updateBoard={updateBoard}
                    />
                  ))
                )}
              </section>
            </div>
          </div>
        </main>
      ) : (
        <h1>Loading...</h1>
      )}
    </main>
  );
}

export default App;
