import { observer } from "mobx-react";
import blackjackStore from "../../stores/GameStore";
import styles from "./BalanceInfo.module.css";

const BalanceInfo = () => {
  return (
    <>
      <div className={styles["balance-wrapper"]}>
        <div className={styles["balance"]}>
          Balance: {blackjackStore.playerBalance} $
        </div>
        <div className={styles["balance"]}>
          Bid: {blackjackStore.betAmount} $
        </div>
      </div>
    </>
  );
};
export default observer(BalanceInfo);
