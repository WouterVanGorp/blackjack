import { Card, Suit } from '../value-types/card.value';
import { CardFactory } from '../factories/card.factory';
import { Entity } from './entity';

export class DeckEntity extends Entity {
    private _cards: Card[] = [];

    public get cards(): ReadonlyArray<Card> {
        return this._cards;
    }

    public create() {
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

    public cheat(cardValues: number[]) {
        let cards: Card[] = cardValues.map(n => CardFactory.create(CardFactory.randomSuit(), n));
        this._cards = cards;
    }

    public draw(): Card {
        let newCards = [...this._cards];
        let card = newCards.shift();
        this._cards = newCards;
        return card;
    }
}