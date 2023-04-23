import React, { useEffect } from "react";
import "./App.css";
import { observer } from "mobx-react";
import blackjackStore from "./stores/GameStore";
import { GameState } from "./types";
import StartingPage from "./components/StartingPage/StartingPage";
import GameTable from "./components/GameTable/GameTable";
import ActionButtons from "./components/ActionButtons/ActionButtons";
import BalanceInfo from "./components/BalanceInfo/BalanceInfo";
import GameModal from "./components/GameModal/GameModal";

function App() {
  useEffect(() => {
    blackjackStore.shuffleDeck();
  }, []);

  const gameState = blackjackStore.gameState;
  console.log("GAME STATE", gameState);

  return (
    <div className="main-container">
      {gameState !== GameState.Idle ? (
        <>
          <div className="content-container">
            <GameTable />
            <div className="action-container">
              <BalanceInfo />
            </div>
            <ActionButtons />
          </div>
          <GameModal />
        </>
      ) : (
        <StartingPage />
      )}
    </div>
  );
}

export default observer(App);
