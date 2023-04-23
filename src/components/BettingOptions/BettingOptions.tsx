import { observer } from "mobx-react";
import Token from "./Token";
import blackjackStore from "../../stores/GameStore";
import { colors, betAmount } from "../../consts/deckConstants";
import { useState } from "react";

const BettingOptions = () => {
  const [animationTokenIndex, setAnimationTokenIndex] = useState(-1);

  function isTokenDisabled(betAmount: number): boolean {
    return betAmount + blackjackStore.betAmount > blackjackStore.playerBalance;
  }

  const addBet =
    (bet: number, index: number) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const newBetAmount = blackjackStore.betAmount + bet;
      if (newBetAmount <= 0 || newBetAmount > blackjackStore.playerBalance) {
      } else {
        blackjackStore.placeBet(bet);
        setAnimationTokenIndex(index);
      }
    };

  return (
    <div className="bet-div">
      {betAmount.map((bet, i) => {
        const shouldAnimate = animationTokenIndex === i;
        return (
          <Token
            children={bet}
            key={i}
            active={bet === blackjackStore.betAmount}
            color={colors[i]}
            onClick={addBet(bet, i)}
            disabled={isTokenDisabled(bet)}
            addClass={shouldAnimate? "dissolveInTop" : ""}
            onTransitionEnd={() => setAnimationTokenIndex(-1)}
          />
        );
      })}
    </div>
  );
};

export default observer(BettingOptions);
