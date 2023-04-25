import React from "react";
import { observer } from "mobx-react";
import blackjackStore from "../../stores/GameStore";
import { GameState } from "../../types";
import logo from "../../assets/images/logo.png";
import play from "../../assets/images/play.png";
import "./StartingPage.css";

function StartingPage() {
  const handleStartGame = () => {
    blackjackStore.setGameState(GameState.Betting);
  };

  return (
    <div className="content-container-start" data-testid="starting-page">
      <div className="logo-container">
        <img src={logo} alt="game-logo" className="logo" />
        <img
          src={play}
          alt="play-logo"
          className="play-button"
          onClick={handleStartGame}
        />
      </div>
    </div>
  );
}

export default observer(StartingPage);
