import { observer } from "mobx-react";
import Token from "./Token";
import blackjackStore from "../../stores/GameStore";

import { colors, betAmount } from "../../consts/deckConstants";
import { GameState } from "../../types";

const BettingOptions = () => {

  const bettingActive = blackjackStore.gameState===GameState.Betting;

  const handleBet =
    (betAmount: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      blackjackStore.placeBet(betAmount);
      blackjackStore.dealCards();
    };

  return (
    <div className="bet-div">
      {betAmount.map((bet, i) => {
        return (
          <Token
            children={bet}
            key={i}
            active = {bet===blackjackStore.betAmount}
            color={colors[i]}
            onClick={handleBet(bet)}
          />
        );
      })}
    </div>
  );
};

export default observer(BettingOptions);
