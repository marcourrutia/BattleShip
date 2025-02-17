import { COLUMNS, ROWS, SHIPS, ALLPOSITIONS } from "./constants";

//generador de posición aleatoria para el turno de la computadora
export const getRandomPosition = (computerShot) => {
  const availablePositions = ALLPOSITIONS.filter(
    (pos) => !computerShot.includes(pos)
  );
  if (availablePositions.length === 0) return null;
  return availablePositions[
    Math.floor(Math.random() * availablePositions.length)
  ];
};

// crea un array con 10 barcos según la cantidad definida en SHIPS de constants.js
export const createShips = () => {
  const ships = [];
  SHIPS.forEach((shipType) => {
    for (let i = 0; i < shipType.count; i++) {
      const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
      const shipInstance = {
        name: shipType.name,
        size: shipType.size,
        orientation: orientation,
      };
      ships.push(shipInstance);
    }
  });
  return ships;
};

//funcion para posicionar los barcos de forma aleatoria
export const positionShips = (shipsArray) => {
  let availablePositions = COLUMNS.flatMap((col) =>
    ROWS.map((row) => `${col}${row}`)
  );
  const positionedShips = [];
  //funcion para no usar los slot al rededor de un barco y tengan mínimo 1 square de separación
  const getBufferPositions = (positions) => {
    const buffer = new Set();
    positions.forEach((pos) => {
      const colIndex = COLUMNS.indexOf(pos[0]);
      const rowIndex = ROWS.indexOf(Number(pos.slice(1)));
      for (let i = colIndex - 1; i <= colIndex + 1; i++) {
        for (let j = rowIndex - 1; j <= rowIndex + 1; j++) {
          if (i >= 0 && i < COLUMNS.length && j >= 0 && j < ROWS.length) {
            buffer.add(`${COLUMNS[i]}${ROWS[j]}`);
          }
        }
      }
    });
    return buffer;
  };

  // Para cada barco, encontrar una posición disponible
  shipsArray.forEach((ship) => {
    const possiblePlacements = [];

    availablePositions.forEach((startPos) => {
      const colIndex = COLUMNS.indexOf(startPos[0]);
      const rowIndex = ROWS.indexOf(Number(startPos.slice(1)));

      if (
        ship.orientation === "horizontal" &&
        colIndex + ship.size > COLUMNS.length
      )
        return;
      if (ship.orientation === "vertical" && rowIndex + ship.size > ROWS.length)
        return;

      const shipPositions = [];
      for (let i = 0; i < ship.size; i++) {
        const pos =
          ship.orientation === "horizontal"
            ? `${COLUMNS[colIndex + i]}${ROWS[rowIndex]}`
            : `${COLUMNS[colIndex]}${ROWS[rowIndex + i]}`;
        if (!availablePositions.includes(pos)) return;
        shipPositions.push(pos);
      }
      possiblePlacements.push(shipPositions);
    });

    if (possiblePlacements.length === 0) {
      throw new Error(`No se pudo ubicar el barco ${ship.name}`);
    }

    const chosenPositions =
      possiblePlacements[Math.floor(Math.random() * possiblePlacements.length)];

    positionedShips.push(chosenPositions);

    const bufferPositions = getBufferPositions(chosenPositions);
    availablePositions = availablePositions.filter(
      (pos) => !bufferPositions.has(pos)
    );
  });

  return positionedShips;
};

//función para detectar si hay ganador
export const isWinner = (shipPosition, hit) => {
  if (shipPosition.length !== hit.length) return false;
  if (shipPosition.length < 10 && hit < 10) return false;
  return shipPosition
    .sort()
    .every((value, index) => value === hit.sort()[index]);
};
