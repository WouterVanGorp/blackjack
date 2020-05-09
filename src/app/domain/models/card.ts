export enum Suit {
    Diamonds,
    Clubs,
    Hearts,
    Spades
}

export interface Card {
    suit: Suit;
    number: number;
    value: number | number[];
}
