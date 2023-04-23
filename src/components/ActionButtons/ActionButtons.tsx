import { observer } from "mobx-react";
import blackjackStore from "../../stores/GameStore";
import Button from "../UI/Button";
import { GameState } from "../../types";
import "./ActionButtons.css";

interface ButtonProps {
  style?: React.CSSProperties & {
    '--item-total'?: number;
    '--item-count'?: number;
  };
}

const ActionButtons = ({style} : ButtonProps) => {
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

  return (
    <div className="buttons-wrapper">
      {!buttonsAreDisabled && (
        <>
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
          
          <Button
            label="SURRENDER"
            onClick={handleReset}
            className="btn btn-black"
          />
        </>
      )}

      <Button label="RESET" onClick={handleReset} className="btn btn-black" />

    </div>
  );
};

export default observer(ActionButtons);
