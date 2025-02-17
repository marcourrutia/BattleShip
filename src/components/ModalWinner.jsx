export const ModalWinner = ({ winner, restart }) => {
  return (
    <div
      className="fixed z-50 flex justify-center items-center w-full md:inset-0 h-screen bg-black/50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="p-4 md:p-5 text-center">
            <svg
              className="size-10 2xl:size-15 place-self-center mb-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1" />
              <path d="M4 18l-1 -3h18l-1 3" />
              <path d="M12 11v4" />
              <path d="M7 3c1.333 2.667 1.333 5.333 0 8h10c1.333 -2.667 1.333 -5.333 0 -8" />
              <path d="M6 3h12" />
            </svg>

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-200">
              Partida finalizada, ganador:
              <span className="text-xl"> {winner}</span>
            </h3>
            <span className="">{restart}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
