import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const board = Array(10).fill(null).map(() => Array(10).fill(null));
  console.log(board);
  return (
    <>
      <h1>Batalla Naval</h1>

    </>
  )
}

export default App
