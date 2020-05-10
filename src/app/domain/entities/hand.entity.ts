import { Card } from '../value-types';
import { Entity } from './entity';

export class Hand extends Entity {
    public cards: Card[] = [];
    public value: number[] = [0];

    public add(card: Card) {
        this.cards.push(card);
        let values = [0]
        for (let card of this.cards) {
            for (let cardValue of card.value) {
                
            }
        }
    }
}