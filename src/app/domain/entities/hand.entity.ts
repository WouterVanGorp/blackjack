import { Card } from '../value-types';
import { Entity } from './entity';

export class Hand extends Entity {
    public cards: Card[] = [];
    public value: number[] = [0];

    public add(...cards: Card[]) {
        this.cards.push(...cards);
    }
}