import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import blackjackStore from "../../stores/GameStore";
import { GameState } from "../../types";
import "./GameModal.css";

const GameModal = observer(() => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    const gameModalTimeout = setTimeout(() => {
      setShowModal(false);
      setModalText("");
    }, 2000);

    return () => {
      clearTimeout(gameModalTimeout);
    };
  }, [showModal]);

  useEffect(() => {
    const newGameState = blackjackStore.getGameState;
    if (newGameState === GameState.Betting) {
      setShowModal(true);
      setModalText(getModalText(newGameState));
    } else if (
      newGameState === GameState.Win ||
      newGameState === GameState.Lose ||
      newGameState === GameState.Draw ||
      newGameState === GameState.Blackjack ||
      newGameState === GameState.Surrender
    ) {
      const delay = blackjackStore.dealerHand.length * 800;
      const showModalTimeout = setTimeout(() => {
        setShowModal(true);
        setModalText(getModalText(newGameState));
      }, delay);
      return () => clearTimeout(showModalTimeout);
    }
  }, [blackjackStore.gameState]);

  const getModalText = (gameState: GameState) => {
    switch (gameState) {
      case GameState.Win:
        return "You Win!";
      case GameState.Lose:
        return "Dealer Wins!";
      case GameState.Draw:
        return "It's a Push!";
      case GameState.Betting:
        return "Place a bet!";
      case GameState.Blackjack:
        return "Blackjack!";
      case GameState.Surrender:
        return "You Surrendered!";
      default:
        return "";
    }
  };

  return showModal ? (
    <div data-test="game-overlay" className="loader-overlay">
      <div className="game-status">{modalText}</div>
    </div>
  ) : null;
});

export default GameModal;
