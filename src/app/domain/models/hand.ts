import { Card } from './card';

export interface DealtCard {
    card: Card;
    isOpen: boolean;
    blackjackValue: number | number[];
}

export interface Hand {
    cards: DealtCard[];
    totalValue: number | number[];
}