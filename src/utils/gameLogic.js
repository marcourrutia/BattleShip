import { COLUMNS, ROWS } from "./constants";

export const getRandomPosition = (computerHit) => {
  const allPositions = COLUMNS.flatMap((col) =>
    ROWS.map((row) => `${col}${row}`)
  );
  const availablePositions = allPositions.filter(
    (pos) => !computerHit.includes(pos)
  );
  if (availablePositions.length === 0) return null;
  return availablePositions[
    Math.floor(Math.random() * availablePositions.length)
  ];
};
