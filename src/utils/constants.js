export const TURNS = {
  Player: "player",
  Computer: "computer",
};

export const COLUMNS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
export const ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const ALLPOSITIONS = COLUMNS.flatMap((col) =>
  ROWS.map((row) => `${col}${row}`)
);

//tipos de barcos, tamaño y cantidad
export const SHIPS = [
  { name: "Acorazado", size: 4, count: 1 },
  { name: "Destructor", size: 3, count: 2 },
  { name: "Cañonera", size: 2, count: 3 },
  { name: "Lancha", size: 1, count: 4 },
];
