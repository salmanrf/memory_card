import React, { useState } from 'react';
import GameBoard from "./components/GameBoard";

const App = () => {
  return (
    <div className="App">
      <header className="header">
        <div id="title" className="white bold">Memory Card Game</div>
      </header>
      <div id="instruction" className="white bold">
        <p>Get points by clicking on an image but don't click on any more than once!</p>
      </div>
      <GameBoard />
    </div>

  );
}

export default App;
