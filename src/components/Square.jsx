import { useEffect, useState } from "react";

export const Square = ({
  id,
  position,
  turn,
  updateBoard,
  computerHit,
  shipsPosition,
}) => {
  const [clicked, setClicked] = useState(false);
  const [isShip, setIsShip] = useState(false);

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
      className={`size-[35px] 2xl:size-[50px] ${
        turn === "player" ? "cell" : "cell-computer"
      } ${clicked ? "clicked" : ""}`}
      onClick={turn === "player" && !clicked ? handleClick : null}
    >
      {isShip ? "a" : ""}
    </div>
  );
};
