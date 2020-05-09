import { Suit, Card } from '../models/card';

export class DeckService {
    private _cards: Card[] = [];

    public get cards(): Card[] {
        return this._cards;
    }

    public create() {
        // Create deck with every unique card
        let suits = Object.keys(Suit).map(key => Number(key)).filter(n => !isNaN(n));
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        for (let suit of suits) {
            for (let value of values) {
                this._cards.push({ suit, value });
            }
        }
    }

    public clear() {
        this._cards = [];
    }

    public shuffle() {
        var cards = [...this._cards];
        var currentIndex = cards.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = cards[currentIndex];
            cards[currentIndex] = cards[randomIndex];
            cards[randomIndex] = temporaryValue;
        }

        this._cards = cards;
    }

    public draw(): Card {
        return this._cards.pop();
    }
}