import { observer } from "mobx-react";
// import { useEffect } from "react";
import blackjackStore from "../../stores/GameStore";
import { Card, GameState } from "../../types";
import CardImage from "./CardImage";
import styles from "./GameTable.module.css";
import BettingOptions from "../BettingOptions/BettingOptions";
import Token from "../BettingOptions/Token";

const GameTable = () => {
  const playersHand = blackjackStore.playerHand;
  const dealersHand = blackjackStore.dealerHand;
  const gameState = blackjackStore.gameState;

  
  return (
    <div className={styles["game-div"]}>
      <div className={styles["cards-container"]}>
        <div className={styles["cards-container-inner"]}>
          {dealersHand.map((card, i) => {
            const filename =
              gameState === GameState.Playing && i>0
                ? "card-back"
                : `${(card.rank + card.suit[0]).toUpperCase()}`;
                const delay = i * 500;

            return (
              <div key={filename}>
                <CardImage fileName={filename} delay={delay}/>
              </div>
            );
          })}
          <div className={styles["score-box"]}>
            {blackjackStore.dealerTotal > 0 ? blackjackStore.dealerTotal : ""}
          </div>
        </div>
        <div className={styles["cards-container-inner"]}>
          {playersHand.map((card, i) => {
            const filename = `${(card.rank + card.suit[0]).toUpperCase()}`;
            const delay = i<2 ? (i) * 500 : 300;
            return (
              <div key={filename}>
                <CardImage fileName={filename} delay={delay}/>
              </div>
            );
          })}
          <div className={styles["score-box"]}>
            {blackjackStore.playerTotal > 0 ? blackjackStore.playerTotal : ""}
          </div>
        </div>
      </div>
      {blackjackStore.gameState === GameState.Betting && <BettingOptions />}
      <div className={styles["total-bet"]}>
        {blackjackStore.betAmount > 0 && (
          <>
            <Token
              children={blackjackStore.betAmount}
              disabled={false}
              active={true}
              color="yellow"
            />
            {blackjackStore.gameState === GameState.Betting && (
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
