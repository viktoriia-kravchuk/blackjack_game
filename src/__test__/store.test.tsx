import "@testing-library/jest-dom";
import { BlackjackStore } from "../stores/GameStore";
import { GameState } from "../types";

describe("BlackjackStore", () => {
  let store: BlackjackStore;

  beforeEach(() => {
    store = new BlackjackStore();
  });

  describe("Initialization", ()=>{
    it("should initialize correctly", () => {
      expect(store.deck).toHaveLength(0);
      expect(store.playerHand).toHaveLength(0);
      expect(store.dealerHand).toHaveLength(0);
      expect(store.playerTotal).toBe(0);
      expect(store.dealerTotal).toBe(0);
      expect(store.betAmount).toBe(0);
      expect(store.playerBalance).toBe(2000);
      expect(store.numberOfDecks).toBe(2);
      expect(store.gameState).toBe(GameState.Idle);
      expect(store.playerHasBlackjack).toBe(false);
      expect(store.dealerHasBlackjack).toBe(false);
    });

  });

  describe("Deck", () => {
    it("should shuffle the deck correctly", () => {
      store.shuffleDeck();
      expect(store.deck).toHaveLength(104);
    });
  });

  describe("Cards", ()=>{
    it("should deal cards correctly", () => {
      store.shuffleDeck();
      store.setGameState(GameState.Dealing);
      store.dealCards();
      expect(store.playerHand).toHaveLength(2);
      expect(store.dealerHand).toHaveLength(2);
      expect(store.deck).toHaveLength(100);
      expect([GameState.Blackjack, GameState.Playing]).toContain(store.gameState);
    });
    it('should calculate the total correctly for a hand with no aces', () => {
      const hand = [
        { rank: '4', suit: 'hearts', value: 4 },
        { rank: 'Jack', suit: 'diamonds', value: 10 },
        { rank: '6', suit: 'clubs', value: 6 },
      ];
  
      expect(store.calculateTotal(hand)).toEqual(20);
    });
  
    it('should calculate the total correctly for a hand with aces', () => {
      const hand = [
        { rank: 'Ace', suit: 'hearts', value: 11 },
        { rank: 'King', suit: 'diamonds', value: 10 },
        { rank: 'Ace', suit: 'clubs', value: 11 },
      ];
  
      expect(store.calculateTotal(hand)).toEqual(12);
    });
  
    it('should calculate the total correctly for a hand with multiple aces', () => {
      const hand = [
        { rank: 'Ace', suit: 'hearts', value: 11 },
        { rank: 'Ace', suit: 'diamonds', value: 11 },
        { rank: '7', suit: 'clubs', value: 7 },
      ];
  
      expect(store.calculateTotal(hand)).toEqual(19);
    });
  
    it('should calculate the total correctly for a hand that busts', () => {
      const hand = [
        { rank: '10', suit: 'hearts', value: 10 },
        { rank: '9', suit: 'diamonds', value: 9 },
        { rank: 'Jack', suit: 'clubs', value: 10 },
      ];
      expect(store.calculateTotal(hand)).toEqual(29);
    });
  });

  describe("Balance", ()=>{
    it("should update player's balance when they win", () => {
      store.setGameState(GameState.Betting);
      store.placeBet(100);
      store.setGameState(GameState.Win);
      expect(store.playerBalance).toBe(2100);
    });
  
    it("should update player's balance when they lose", () => {
      store.setGameState(GameState.Betting);
      store.placeBet(100);
  
      store.setGameState(GameState.Playing);
  
      store.playerHand = [
        { suit: "hearts", rank: "2", value: 2 },
        { suit: "clubs", rank: "King", value: 10 },
      ];
      store.dealerHand = [
        { suit: "diamonds", rank: "Jack", value: 10 },
        { suit: "spades", rank: "Queen", value: 10 },
      ];
      store.stand();
      expect(store.playerBalance).toBe(1900);
    });
  
    it("should update player's balance when they surrender", () => {
      store.setGameState(GameState.Betting);
      store.placeBet(100);
      store.setGameState(GameState.Surrender);
      expect(store.playerBalance).toBe(1950);
    });  
  })

  describe("Gameplay",()=>{
    it("should hit correctly", () => {
      store.playerHand = [
        { suit: "hearts", rank: "2", value: 2 },
        { suit: "clubs", rank: "King", value: 10 },
      ];
      store.shuffleDeck();
      store.setGameState(GameState.Playing);
      store.hit();
      expect(store.playerHand).toHaveLength(3);
      expect(store.playerTotal).toBeGreaterThan(0);
    });
    it("should stand correctly", () => {
      store.dealerHand = [
        { suit: "diamonds", rank: "Ace", value: 11 },
        { suit: "spades", rank: "Queen", value: 10 },
      ];
      store.shuffleDeck();
      store.setGameState(GameState.Playing);
      store.stand();
      expect(store.dealerHand).toHaveLength(2);
      expect(store.computedDealerTotal).toBeGreaterThan(0);
    });
    it("should reset correctly", () => {
      store.setNumberOfDecks(3);
      store.setGameState(GameState.Betting);
      store.placeBet(100);
      store.setGameState(GameState.Dealing);
      store.shuffleDeck();
      store.dealCards();
  
      expect(store.numberOfDecks).toBe(3);
      expect(store.betAmount).toBe(100);
      expect(store.playerHand.length).toBe(2);
      expect(store.dealerHand.length).toBe(2);
  
      store.resetGame();
  
      expect(store.numberOfDecks).toBe(3);
      expect(store.betAmount).toBe(0);
      expect(store.playerHand.length).toBe(0);
      expect(store.dealerHand.length).toBe(0);
    });
  });
});
