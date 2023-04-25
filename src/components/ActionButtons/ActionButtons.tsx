import { observer } from "mobx-react";
import blackjackStore from "../../stores/GameStore";
import Button from "../UI/Button";
import { GameState } from "../../types";
import "./ActionButtons.css";

const ActionButtons = () => {
  const buttonsAreDisabled: boolean =
    blackjackStore.gameState !== GameState.Playing;

  const buttonHitIsDisabled: boolean = blackjackStore.playerTotal > 21;

  const handleHit = () => {
    blackjackStore.hit();
  };

  const handleStand = () => {
    blackjackStore.stand();
  };

  const handleReset = () => {
    blackjackStore.resetGame();
  };

  const handleSurrender = () => {
    blackjackStore.setGameState(GameState.Surrender);;
  };

  return (
    <div className="buttons-wrapper">
      {!buttonsAreDisabled && (
        <>
          <Button
            label="SURRENDER"
            onClick={handleSurrender}
            className="btn btn-black"
          />
          {!buttonHitIsDisabled && (
            <Button
              label="HIT"
              onClick={handleHit}
              className="btn btn-yellow"
              disabled={buttonsAreDisabled}
            />
          )}
          <Button
            label="STAND"
            onClick={handleStand}
            className="btn btn-red"
            disabled={buttonsAreDisabled}
          />
        </>
      )}

      <Button label="RESET" onClick={handleReset} className="btn btn-black" />
    </div>
  );
};

export default observer(ActionButtons);
