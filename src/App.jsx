import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";

function App() {
  return (
    <>
      <h1 className="text-6xl p-7 text-white/90">Batalla Naval</h1>
      <main className="flex gap-10">
        <section className="">
          <h1 className="text-4xl p-5">Jugador</h1>
          <Board />
        </section>
        <h1 className="text-5xl self-center">VS</h1>
        <section>
          <h1 className="text-4xl p-5">Computadora</h1>
          <Board />
        </section>
      </main>
    </>
  );
}

export default App;
