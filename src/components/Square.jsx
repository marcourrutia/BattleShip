import { useEffect, useState } from "react";

export const Square = ({
  id,
  position,
  turn,
  updateBoard,
  computerShot,
  shipsPosition,
  computerHit,
  playerHit,
}) => {
  const [clicked, setClicked] = useState(false);
  const [isShip, setIsShip] = useState(false);
  const [hit, setHit] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
      updateBoard(position);
    }
  };

  useEffect(() => {
    if (playerHit) {
      if (playerHit.includes(position)) {
        setHit(true);
      }
    }
  }, [playerHit]);

  useEffect(() => {
    if (shipsPosition) {
      if (shipsPosition.includes(position)) setIsShip(true);
    }
  }, []);

  useEffect(() => {
    if (computerShot) {
      if (computerShot.includes(position)) setClicked(true);
      if (computerHit.includes(position)) setHit(true);
    }
  }, [computerShot]);

  return (
    <div
      className={`size-[35px] 2xl:size-[50px] ${
        turn === "player" ? "cell" : "cell-computer"
      } ${clicked ? "clicked" : ""} ${
        id === "player" && isShip ? "is-ship" : ""
      } ${hit ? "hit" : ""}`}
      onClick={turn === "player" && !clicked ? handleClick : null}
    >
      {hit && <span className="text-2xl">💥</span>}
    </div>
  );
};
