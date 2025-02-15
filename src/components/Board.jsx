export const Board = () => {
  const board = Array(10).fill(Array(10).fill(null));

  return (
    <section className="board">
      {board.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="cell"></div>
        ))
      )}
    </section>
  );
};
