import React, { useEffect } from "react";
import "./App.css";
import { observer } from "mobx-react";
import blackjackStore from "./stores/GameStore";
import { GameState } from "./types";
import StartingPage from "./components/StartingPage/StartingPage";

function App() {
  useEffect(() => {
    blackjackStore.shuffleDeck();
  }, []);

  const deck = blackjackStore.getDeck;
  const gameState = blackjackStore.gameState;

  return (
    <div className="main-container">
      {gameState !== GameState.Idle ? (
        <>
          <div className="header-container">
            <h1>Header</h1>
          </div>
          <div className="content-container">
            <div className="game-div"></div>
          </div>
          <div className="action-container">
            <button>Action</button>
          </div>
        </>
      ) : (
        <StartingPage />
      )}
    </div>
  );
}

export default observer(App);
