import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { observer } from "mobx-react";
import { GameState } from "./types";
import blackjackStore from "./stores/GameStore";
import StartingPage from "./components/StartingPage/StartingPage";
import GameTable from "./components/GameTable/GameTable";
import ActionButtons from "./components/ActionButtons/ActionButtons";
import BalanceInfo from "./components/BalanceInfo/BalanceInfo";
import GameModal from "./components/GameModal/GameModal";
import "./App.css";

function App() {
  useEffect(() => {
    blackjackStore.shuffleDeck();
  }, []);

  const gameState = blackjackStore.gameState;

  return (
    <div className="main-container">
      <CSSTransition
        in={gameState !== GameState.Idle}
        classNames="game-table"
        timeout={1000}
        unmountOnExit
      >
        <div className="content-container" data-testid="game-table">
          <GameTable />
          <div className="action-container">
            <BalanceInfo />
          </div>
          <ActionButtons />
        </div>
      </CSSTransition>
      <GameModal />
      {gameState === GameState.Idle && <StartingPage />}
    </div>
  );
}

export default observer(App);
