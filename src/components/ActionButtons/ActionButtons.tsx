import { observer } from "mobx-react";
import blackjackStore from "../../stores/GameStore";
import Button from "../UI/Button";
import { GameState } from "../../types";
import "./ActionButtons.css";

const ActionButtons = () => {
  const buttonsAreDisabled: boolean =
    blackjackStore.gameState !== GameState.Playing;

  const handleHit = () => {
    blackjackStore.hit();
  };

  const handleStand = () => {
    blackjackStore.stand();
  };

  const handleReset = () => {
    blackjackStore.resetGame();
  };

  return (
    <div className="buttons-wrapper">
      <Button
        label="HIT"
        onClick={handleHit}
        className="btn btn-red"
        disabled={buttonsAreDisabled}
      />
      <Button
        label="STAND"
        onClick={handleStand}
        className="btn btn-yellow"
        disabled={buttonsAreDisabled}
      />
      <Button label="RESET" onClick={handleReset} className="btn btn-green" />
    </div>
  );
};

export default observer(ActionButtons);
