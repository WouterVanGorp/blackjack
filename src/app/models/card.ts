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

export class CardFactory {
    public static create(suit: Suit, number: number): Card {
        // Compute value
        let value: number | number[] = number;
        if (number > 10) {
            value = 10
        } else if (number === 1) {
            value = [1, 11];
        }

        return {
            suit,
            number,
            value,
        };
    }

    public static createNewDeck(): Card[] {
        let cards: Card[] = [];
        let suits = [Suit.Diamonds, Suit.Clubs, Suit.Hearts, Suit.Spades];
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for (let suit of suits) {
            for (let number of numbers) {
                cards.push(CardFactory.create(suit, number));
            }
        }
        return cards;
    }
}