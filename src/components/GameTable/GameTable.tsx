import { observer } from "mobx-react";
// import { useEffect } from "react";
import blackjackStore from "../../stores/GameStore";
import { GameState } from "../../types";
import CardImage from "./CardImage";
import styles from "./GameTable.module.css";
import BettingOptions from "../BettingOptions/BettingOptions";

const GameTable = () => {
  const playersHand = blackjackStore.playerHand;
  const dealersHand = blackjackStore.dealerHand;
  const gameState = blackjackStore.gameState;

  return (
    <div className={styles["game-div"]}>
      <BettingOptions />
      {/* <div>PLAYER TOTAL: {blackjackStore.playerTotal}</div>
      <div>DEALER TOTAL: {blackjackStore.dealerTotal}</div> */}

      <div className={styles["cards-container"]}>
        <div className={styles["cards-container-inner"]}>
          {playersHand.map((card) => {
            const filename = `${(card.rank + card.suit[0]).toUpperCase()}`;
            return (
              <div key={filename}>
                <CardImage fileName={filename} />
              </div>
            );
          })}
        </div>
        <div className={styles["cards-container-inner"]}>
          {dealersHand.map((card, i) => {
            const filename =
              gameState === GameState.Playing && i === 1
                ? "card-back"
                : `${(card.rank + card.suit[0]).toUpperCase()}`;

            return (
              <div key={filename}>
                <CardImage fileName={filename} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default observer(GameTable);
