export enum Suit {
    Diamonds,
    Clubs,
    Hearts,
    Spades
}

export interface Card {
    suit: Suit;
    value: number;
}
