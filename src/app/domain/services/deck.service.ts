import { Card } from '../models/card';
import { CardFactory } from '../factories/card.factory';

export class DeckService {
    private _cards: Card[] = [];

    public get cards(): Card[] {
        return this._cards;
    }

    public create() {
        // Create deck with every unique card
        this._cards = CardFactory.createNewDeck();
    }

    public clear() {
        this._cards = [];
    }

    public shuffle() {
        // Create copy of array
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