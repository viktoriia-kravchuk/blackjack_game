import { observer } from "mobx-react";
import blackjackStore from "../../stores/GameStore";
import { Card, GameState } from "../../types";
import CardImage from "./CardImage";
import styles from "./GameTable.module.css";
import BettingOptions from "../BettingOptions/BettingOptions";
import Token from "../BettingOptions/Token";

const getCardFilename = (card: Card, gameState: GameState, index: number, hand: string) => {
  if (gameState === GameState.Playing && index > 0 && hand==="dealer") {
    return "card-back";
  }
  return `${(card.rank + card.suit[0]).toUpperCase()}`;
};
const getCardDelay = (index: number, hand: string) => {
  if (index < 2) {
    return index*400;
  } else if (hand === "dealer" && index > 1) {
    return index*800;
  } else if (hand === "player" && index > 2) {
    return 500;
  }
};

const GameTable = () => {
  const {
    playerHand,
    dealerHand,
    gameState,
    dealerTotal,
    playerTotal,
    betAmount,
  } = blackjackStore;

  return (
    <div className={styles["game-div"]}>
      <div className={styles["cards-container"]}>
        <div className={styles["cards-container-inner"]}>
          {dealerHand.map((card, i) => {
            const filename = getCardFilename(card, gameState, i, "dealer");
            const delay = getCardDelay(i, "dealer");

            return (
              <div key={filename}>
                <CardImage fileName={filename} delay={delay} />
              </div>
            );
          })}
          <div className={styles["score-box"]}>
            {dealerTotal > 0 ? dealerTotal : ""}
          </div>
        </div>
        <div className={styles["cards-container-inner"]}>
          {playerHand.map((card, i) => {
            const filename = getCardFilename(card, gameState, i, "player");
            const delay = getCardDelay(i, "player");

            return (
              <div key={filename}>
                <CardImage fileName={filename} delay={delay} />
              </div>
            );
          })}
          <div className={styles["score-box"]}>
            {playerTotal > 0 ? playerTotal : ""}
          </div>
        </div>
      </div>
      {gameState === GameState.Betting && <BettingOptions />}
      <div className={styles["total-bet"]}>
        {betAmount > 0 && (
          <>
            <Token
              children={betAmount}
              disabled={false}
              active={true}
              color="yellow"
            />
            {gameState === GameState.Betting && (
              <button
                className={styles["deal-button"]}
                onClick={() => {
                  blackjackStore.setGameState(GameState.Dealing);
                  blackjackStore.dealCards();
                }}
              >
                DEAL
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default observer(GameTable);
