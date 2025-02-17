export const RestartButton = ({
  setPlayerShot,
  setComputerShot,
  setPlayerPosition,
  setComputerPosition,
  setPlayerHit,
  setComputerHit,
  setHaveWinner,
  restart,
  setRestart,
}) => {
  const handleClick = () => {
    setHaveWinner(null);
    setPlayerPosition([]);
    setComputerPosition([]);
    setComputerShot([]);
    setPlayerShot([]);
    setPlayerHit([]);
    setComputerHit([]);
    setRestart(!restart);
  };

  return (
    <button
      type="button"
      className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 cursor-pointer active:scale-90 lg:mt-10 lg:self-start"
      onClick={handleClick}
    >
      <svg
        className="size-6 2xl:size-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
      </svg>
      <span className="text-l 2xl:text-2xl px-2">Restart</span>
    </button>
  );
};
