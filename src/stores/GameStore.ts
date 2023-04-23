import { makeObservable, observable, action, reaction } from "mobx";
import { suits, ranks } from "../consts/deckConstants";
import { Card, GameState, numberOfDecks } from "../types";

class BlackjackStore {
  deck: Card[] = [];
  playerHand: Card[] = [];
  dealerHand: Card[] = [];
  playerTotal = 0;
  dealerTotal = 0;
  betAmount = 0;
  playerBalance: number = 2000;
  numberOfDecks: numberOfDecks = 2;
  gameState: GameState = GameState.Idle;
  playerHasBlackjack: boolean = false;
  dealerHasBlackjack: boolean = false;

  constructor() {
    makeObservable(this, {
      deck: observable,
      playerHand: observable,
      dealerHand: observable,
      playerTotal: observable,
      dealerTotal: observable,
      betAmount: observable,
      playerBalance: observable,
      gameState: observable,
      numberOfDecks: observable,
      playerHasBlackjack: observable,
      dealerHasBlackjack: observable,
      shuffleDeck: action,
      dealCards: action,
      calculateTotal: action,
      hit: action,
      stand: action,
      checkForBlackjack: action,
      placeBet: action,
      resetGame: action,
    });

    // reaction to update playerTotal based on changes in playerHand
    reaction(
      () => this.playerHand.length,
      () => {
        this.playerTotal = this.calculateTotal(this.playerHand);
        console.log(this.playerTotal, "calculate method");
        this.playerHasBlackjack = this.checkForBlackjack(this.playerHand);
      }
    );

    // reaction to update dealerTotal based on changes in dealerHand
    reaction(
      () => this.dealerHand.length,
      () => {
        this.dealerTotal = this.calculateTotal(this.dealerHand);
        this.dealerHasBlackjack = this.checkForBlackjack(this.dealerHand);
      }
    );

    reaction(
      () => this.gameState,
      (newGameState) => {
        this.updatePlayerBalance(newGameState);
      }
    );
  }

  setGameState(newState: GameState): void {
    this.gameState = newState;
  }

  setNumberOfDecks(number: numberOfDecks): void {
    this.numberOfDecks = number;
  }

  // method to shuffle the deck of cards
  shuffleDeck() {
    const deck: Card[] = [];
    for (let i = 0; i < this.numberOfDecks; i++) {
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
        }
      }
      // Deal two cards to the dealer
      for (let i = 0; i < 2; i++) {
        const card = this.deck.pop();
        if (card) {
          this.dealerHand.push(card);
        }
      }
      this.gameState = GameState.Playing;
    }
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
    if (this.playerTotal > 21) {
      this.gameState = GameState.Lose;
      console.log(
        this.playerTotal,
        "PLAYER TOTAL is more than 21, stop taking cards",
        this.gameState
      );
      return;
    }
    const card = this.deck.pop();
    if (card) {
      console.log("pushing cards to player", this.playerTotal);
      this.playerHand.push(card);
    }
  }

  get computedDealerTotal(): number {
    return this.calculateTotal(this.dealerHand);
  }

  // method for the dealer to reveal their second card, hit until their hand value is 17 or higher, and determine the winner
  stand() {
    if (this.gameState !== GameState.Playing) {
      return;
    }
    // Dealer hits until hand value is 17 or higher
    while (this.computedDealerTotal < 17) {
      const card = this.deck.pop();
      if (card) {
        this.dealerHand.push(card);
      }
    }
    // Determine winner
    if (this.computedDealerTotal > 21) {
      this.gameState = GameState.Win; // dealer bust, player wins
    } else if (this.playerTotal > this.computedDealerTotal) {
      this.gameState = GameState.Win; // player has higher hand value, player wins
    } else if (this.computedDealerTotal > this.playerTotal) {
      this.gameState = GameState.Lose; // dealer has higher hand value, player loses
    } else {
      this.gameState = GameState.Draw; // hand values are tied, it's a draw
    }
  }

  // method to check for blackjack (total of 21 with only 2 cards) in a hand
  checkForBlackjack(hand: Card[]): boolean {
    const total = this.calculateTotal(hand);
    const isBlackjack = total === 21 && hand.length === 2;
    if (isBlackjack) {
      this.gameState = GameState.Blackjack;
    }
    return isBlackjack;
  }

  updatePlayerBalance(gameOutcome: GameState): void {
    if (gameOutcome === GameState.Win) {
      this.playerBalance += this.betAmount;
    } else if (gameOutcome === GameState.Lose) {
      this.playerBalance -= this.betAmount;
    } else if (gameOutcome === GameState.Blackjack) {
      this.playerBalance += this.betAmount * 1.5;
    }
    return;
  }

  // method to place a bet
  placeBet(amount: number) {
    if (this.gameState === GameState.Betting) {
      const newBetAmount = this.betAmount + amount;
      this.betAmount = newBetAmount;
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
    this.dealerHasBlackjack = false;
    this.playerHasBlackjack = false;
    this.shuffleDeck();
  }
}

const blackjackStore = new BlackjackStore();
export default blackjackStore;
