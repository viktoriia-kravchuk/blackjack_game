import { observer } from "mobx-react";
import { useEffect } from "react";
import blackjackStore from "../../stores/GameStore";
import { GameState } from "../../types";
import CardImage from "./CardImage";
import "./GameTable.css";

const GameTable = () => {
  const playersHand = blackjackStore.playerHand;
  const dealersHand = blackjackStore.dealerHand;
  const gameState = blackjackStore.gameState;

  useEffect(() => {}, []);

  return (
    <div className="game-div">
      <div className="cards-container">
        <div className="cards-container-inner">
          {playersHand.map((card) => {
            const filename = `${(card.rank + card.suit[0]).toUpperCase()}.png`;
            return (
              <div key={filename}>
                <CardImage
                  fileName={filename}
                  alt={filename}
                  className="game-card"
                />
              </div>
            );
          })}
        </div>
        <div className="cards-container-inner">
          {dealersHand.map((card, i) => {
            const filename =
              gameState === GameState.Playing && i === 1
                ? "card-back.png"
                : `${(card.rank + card.suit[0]).toUpperCase()}.png`;

            return (
              <div key={filename}>
                <CardImage
                  fileName={filename}
                  alt={filename}
                  className="game-card"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default observer(GameTable);
