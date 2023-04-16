export interface Rank {
  name: string;
  value: number;
}

export interface Card {
  suit: string;
  rank: string;
  value: number;
}

export enum GameState {
  Idle = "idle",
  Betting = "betting",
  Dealing = "dealing",
  Playing = "playing",
  Stand = "stand",
  Win = "win",
  Lose = "lose",
  Draw = "draw",
  Blackjack = "blackjack",
}

export interface BettingTokenProps {
  children: React.ReactNode;
  color: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined; 
  active: boolean;
}

export type numberOfDecks = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;