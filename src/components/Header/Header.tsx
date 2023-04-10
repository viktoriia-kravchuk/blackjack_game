import { observer } from "mobx-react";
import blackjackStore from "../../stores/GameStore";
import { GameState } from "../../types";
import "./Header.css";

const Header = () => {
  const gameStatus = blackjackStore.gameState;
  let text;

  switch (gameStatus) {
    case GameState.Betting:
      text = "Place a bet !";
      break;
    case GameState.Dealing:
      text = "Dealing cards";
      break;
    case GameState.Playing:
        text = "Playing";
        break;
    case GameState.Win:
        text = "You won!";
        break;
    case GameState.Lose:
        text = "You lose :(";
        break;
    case GameState.Draw:
        text = "It's a draw";
        break;
    default:
      text = "";
  }
  return (
    <div className="header-container">
      <div className="text-container">{text}</div>
      <div className="bet-amount">Bet is {blackjackStore.betAmount}</div>
    </div>

  );
};

export default observer(Header);
