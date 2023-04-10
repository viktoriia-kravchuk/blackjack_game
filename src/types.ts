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
  End = "end",
}

export interface BettingTokenProps {
  children: React.ReactNode;
  color: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined; 
}
