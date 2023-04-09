import { makeObservable, observable, action } from "mobx";
import { suits, ranks } from "../consts/deckConstants";
import { Card, GameState } from "../types";

class BlackjackStore {
  deck: Card[] = [];
  playerHand: Card[] = [];
  dealerHand: Card[] = [];
  playerTotal = 0;
  dealerTotal = 0;
  betAmount = 0;
  gameState: GameState = GameState.Idle;

constructor() {
    makeObservable(this, {
      deck: observable,
      playerHand: observable,
      dealerHand: observable,
      playerTotal: observable,
      dealerTotal: observable,
      betAmount: observable,
      gameState: observable,
      shuffleDeck: action,
      dealCards: action,
      calculateTotal: action,
      hit: action,
      stand: action,
      placeBet: action,
      resetGame: action,
    });
  }

  setGameState(newState: GameState): void {
    this.gameState = newState;
  }

  // method to shuffle the deck of cards
  shuffleDeck() {
    const deck: Card[] = [];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        const card: Card = {
          suit: suits[i],
          rank: ranks[j].name,
          value: ranks[j].value,
        };
        deck.push(card);
      }
    }
    // shuffle the deck using Fisher-Yates algorithm
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    this.deck = deck;
  }

  get getDeck() {
    return this.deck;
  }

  get getGameState(): GameState {
    return this.gameState;
  }

  // method to deal cards to the player and the dealer
  dealCards() {
    if (this.gameState === GameState.Dealing) {
      // Deal two cards to the player
      for (let i = 0; i < 2; i++) {
        const card = this.deck.pop();
        if (card) {
          this.playerHand.push(card);
          this.playerTotal += card.value;
        }
      }
      this.gameState = GameState.Playing;
    }

    // Deal two cards to the dealer
    for (let i = 0; i < 2; i++) {
      const card = this.deck.pop();
      if (card) {
        this.dealerHand.push(card);
        this.dealerTotal += card.value;
      }
    }
    this.gameState = GameState.Playing;
  }

  // method to calculate the total value of a hand
  calculateTotal(hand: Card[]): number {
    let total = 0;
    let aceCount = 0;
    for (let i = 0; i < hand.length; i++) {
      const card = hand[i];
      total += card.value;

      if (card.rank === ranks[0].name) {
        aceCount++;
      }
    }

    while (total > 21 && aceCount > 0) {
      total -= 10;
      aceCount--;
    }

    return total;
  }

  // method to deal another card to the player and recalculate the total
  hit() {
    if (this.gameState !== GameState.Playing) {
      return;
    }

    const card = this.deck.pop();
    if (card) {
      this.playerHand.push(card);
      this.playerTotal += card.value;
    }
    if (this.playerTotal > 21) {
      this.gameState = GameState.Lose;
    }
  }

  // method for the dealer to reveal their second card, hit until their hand value is 17 or higher, and determine the winner
  stand() {
    if (this.gameState !== GameState.Playing) {
      return;
    }
    // Dealer hits until hand value is 17 or higher
    while (this.dealerTotal < 17) {
      const card = this.deck.pop();
      if (card) {
        this.dealerHand.push(card);
        this.dealerTotal += card.value;
      }
    }
    // Determine winner
    if (this.dealerTotal > 21) {
      this.gameState = GameState.Win; // dealer bust, player wins
    } else if (this.playerTotal > this.dealerTotal) {
      this.gameState = GameState.Win; // player has higher hand value, player wins
    } else if (this.dealerTotal > this.playerTotal) {
      this.gameState = GameState.Lose; // dealer has higher hand value, player loses
    } else {
      this.gameState = GameState.Draw; // hand values are tied, it's a draw
    }
  }

  // method to place a bet
  placeBet(amount: number) {
    if (this.gameState === GameState.Betting) {
      if (amount <= 0) {
        throw new Error("Bet amount must be greater than 0.");
      }
      if (amount > this.betAmount) {
        throw new Error("Insufficient balance to place bet.");
      }
      this.betAmount = amount;
      this.gameState = GameState.Dealing;
    }
  }
  // method to reset the game state and clear the hands and totals
  resetGame() {
    this.deck = [];
    this.playerHand = [];
    this.dealerHand = [];
    this.playerTotal = 0;
    this.dealerTotal = 0;
    this.betAmount = 0;
    this.gameState = GameState.Idle;
  }
}

const blackjackStore = new BlackjackStore();
export default blackjackStore;
