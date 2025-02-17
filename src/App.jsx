import { useEffect, useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { TURNS, COLUMNS, ROWS, SHIPS } from "./utils/constants";
import {
  getRandomPosition,
  createShips,
  positionShips,
  isWinner,
} from "./utils/gameLogic";
import { RestartButton } from "./components/RestartButton";
import { ModalWinner } from "./components/ModalWinner";

function App() {
  const [turn, setTurn] = useState(TURNS.Player);
  const [playerShot, setPlayerShot] = useState([]);
  const [computerShot, setComputerShot] = useState([]);
  const [playerPosition, setPlayerPosition] = useState([]);
  const [computerPosition, setComputerPosition] = useState([]);
  const [playerHit, setPlayerHit] = useState([]);
  const [computerHit, setComputerHit] = useState([]);
  const [haveWinner, setHaveWinner] = useState(null);
  const [restart, setRestart] = useState(false);

  //posicionamiento de barcos aleatorio
  useEffect(() => {
    const playerShip = positionShips(createShips());
    const computerShip = positionShips(createShips());
    setPlayerPosition(playerShip.flat());
    setComputerPosition(computerShip.flat());
  }, [restart]);

  //logíca del turno del player, al hacer click sobre un Square
  const updateBoard = (position) => {
    if (turn === TURNS.Player) {
      if (!playerShot.includes(position)) {
        setPlayerShot((prev) => [...prev, position]);
      }
      if (computerPosition.includes(position)) {
        setPlayerHit((prev) => [...prev, position]);
      } else {
        setTurn(TURNS.Computer);
      }
    }
  };

  //aquí la lógica del turno de la computadora y comprobar si hay ganador
  useEffect(() => {
    if (turn === TURNS.Computer) {
      setTimeout(() => {
        const position = getRandomPosition(computerShot);
        if (position) {
          setComputerShot((prev) => [...prev, position]);
          if (playerPosition.includes(position)) {
            setComputerHit((prev) => [...prev, position]);
          } else {
            setTurn(TURNS.Player);
          }
        } else {
          console.log("no quedan posiciones");
        }
      }, 1000);
    }
  }, [turn, computerShot]);

  //comprueba si hay ganador
  useEffect(() => {
    if (playerHit.length > 18 || computerHit.length > 18) {
      if (turn === TURNS.Computer) {
        const winner = isWinner(playerPosition, computerHit);
        console.log("winner compu?: ", winner);
        if (winner) {
          setHaveWinner("Computadora");
        }
      } else {
        const winner = isWinner(computerPosition, playerHit);
        console.log("winner player?: ", winner);
        if (winner) {
          setHaveWinner("Jugador");
        }
      }
    }
  }, [turn, playerHit, computerHit]);

  return (
    <main className="w-fit pb-10">
      {haveWinner !== null ? (
        <ModalWinner
          winner={haveWinner}
          restart={
            <RestartButton
              setPlayerShot={setPlayerShot}
              setComputerShot={setComputerShot}
              setPlayerPosition={setPlayerPosition}
              setComputerPosition={setComputerPosition}
              setPlayerHit={setPlayerHit}
              setComputerHit={setComputerHit}
              setHaveWinner={setHaveWinner}
              restart={restart}
              setRestart={setRestart}
            />
          }
        />
      ) : null}
      <h1 className="text-4xl 2xl:text-6xl pb-2 2xl:p-7 text-white/90">
        Batalla Naval
      </h1>
      {playerPosition.length > 0 && computerPosition.length > 0 ? (
        <main className="flex flex-col lg:flex-row gap-5 w-fit place-items-center">
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
                      computerShot={computerShot}
                      shipsPosition={playerPosition}
                      computerHit={computerHit}
                    />
                  ))
                )}
              </section>
            </div>
          </div>
          <RestartButton
            setPlayerShot={setPlayerShot}
            setComputerShot={setComputerShot}
            setPlayerPosition={setPlayerPosition}
            setComputerPosition={setComputerPosition}
            setPlayerHit={setPlayerHit}
            setComputerHit={setComputerHit}
            setHaveWinner={setHaveWinner}
            restart={restart}
            setRestart={setRestart}
          />
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
                      playerHit={playerHit}
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
