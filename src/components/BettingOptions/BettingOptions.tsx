import { observer } from "mobx-react";
import Token from "./Token";
import blackjackStore from "../../stores/GameStore";
import { colors, betAmount as bets} from "../../consts/deckConstants";
import { useState } from "react";

const BettingOptions = () => {
  const { playerBalance, betAmount: currentBetAmount } = blackjackStore;
  const [animationTokenIndex, setAnimationTokenIndex] = useState(-1);

  function isTokenDisabled(bet: number): boolean {
    return bet + currentBetAmount > playerBalance;
  }

  const addBet = (bet: number, index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
    const newBetAmount = currentBetAmount + bet;
    if (newBetAmount <= 0 || newBetAmount > playerBalance) {
    } else {
      blackjackStore.placeBet(bet);
      setAnimationTokenIndex(index);
    }
  };

  return (
    <div className="bet-div">
      {bets.map((bet, i) => {
        const shouldAnimate = animationTokenIndex === i;
        return (
          <Token
            children={bet}
            key={i}
            active={bet === currentBetAmount}
            color={colors[i]}
            onClick={addBet(bet, i)}
            disabled={isTokenDisabled(bet)}
            addClass={shouldAnimate ? "dissolveInTop" : ""}
            onTransitionEnd={() => setAnimationTokenIndex(-1)}
          />
        );
      })}
    </div>
  );
};

export default observer(BettingOptions);
