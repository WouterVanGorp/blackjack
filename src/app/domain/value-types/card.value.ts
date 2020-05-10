import { ValueType } from './value-type';

export enum Suit {
    Diamonds,
    Clubs,
    Hearts,
    Spades
}

export interface Card extends ValueType {
    suit: Suit;
    number: number;
    value: number[];
    isOpen: boolean;
}
