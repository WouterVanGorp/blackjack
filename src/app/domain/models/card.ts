export enum Suit {
  Diamonds = 3,
  Clubs = 0,
  Hearts = 1,
  Spades = 2
}

export interface Card {
  suit: Suit;
  number: number;
  value: number | number[];
}
