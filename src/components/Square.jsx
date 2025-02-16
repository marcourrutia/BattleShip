import { useEffect, useState } from "react";

export const Square = ({ position, turn, updateBoard, computerHit }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      updateBoard(position);
    }
  };

  useEffect(() => {
    if (computerHit) {
      if (computerHit.includes(position)) {
        setClicked(true);
      }
    }
  }, [computerHit]);

  return (
    <div
      className={`${turn === "player" ? "cell" : "cell-computer"} ${
        clicked ? "clicked" : ""
      }`}
      onClick={turn === "player" && !clicked ? handleClick : null}
    ></div>
  );
};
