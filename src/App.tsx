import React, { useEffect } from "react";
import "./App.css";
import { observer } from "mobx-react";
import blackjackStore from "./stores/GameStore";
import { GameState } from "./types";
import StartingPage from "./components/StartingPage/StartingPage";
import BettingOptions from "./components/BettingOptions/BettingOptions";
import Header from "./components/Header/Header";
import GameTable from "./components/GameTable/GameTable";
import ActionButtons from "./components/ActionButtons/ActionButtons";

function App() {
  useEffect(() => {
    blackjackStore.shuffleDeck();
  }, []);

  const deck = blackjackStore.getDeck;
  const gameState = blackjackStore.gameState;
  console.log("GAME STATE", gameState);

  return (
    <div className="main-container">
      {gameState !== GameState.Idle ? (
        <>
          <Header />
          <div className="content-container">
            <GameTable />
            <div className="action-container">
              {/* <Scores> */}
              <ActionButtons />
            </div>
          </div>
        </>
      ) : (
        <StartingPage />
      )}
    </div>
  );
}

export default observer(App);
