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
  Surrender = "surrender",
}

export interface BettingTokenProps {
  children: React.ReactNode;
  color: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined; 
  active: boolean;
  disabled: boolean;
  addClass?: string;
  onTransitionEnd?: React.TransitionEventHandler<HTMLButtonElement> | undefined;
}

export type numberOfDecks = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;