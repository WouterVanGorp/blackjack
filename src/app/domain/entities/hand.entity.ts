import { Card } from '../value-types';
import { Entity } from './entity';

export class Hand extends Entity {
    public constructor(init?: Partial<Hand>) {
        super();
        Object.assign(this, init);
    }

    public cards: Card[] = [];
    public value: number = 0;

    public add(...cards: Card[]) {
        this.cards = [...this.cards, ...cards];
        this.value = Hand.computeValue(this.cards);
    }

    public showCards() {
        this.cards = this.cards.map<Card>(card => ({
            ...card,
            isOpen: true,
        }));
        this.value = Hand.computeValue(this.cards);
    }

    private static computeValue(cards: Card[]): number {
        // Check how many times in total we can calculate a sum
        let aces: Card[] = [];
        let nonAces: Card[] = [];
        for (let card of cards) {
            if (!card.isOpen) continue;
            if (card.number === 1) aces.push(card);
            else nonAces.push(card);
        }
        
        let baseValue = Hand.sum(...nonAces.map(c => c.value[0]));
        let aceValue = 0;
        let totalValue = baseValue;
        for (let i = 0; i <= aces.length; i++) {
            let values: number[] = [];
            for (let j = 0; j < aces.length; j++) {
                values.push(j < i ? 1 : 11);
            }
            aceValue = Hand.sum(...values);
            totalValue = baseValue + aceValue;
            if (totalValue <= 21) {
                return totalValue;
            }
        }
        return totalValue;
    }

    private static sum(...nums: number[]) {
        let sum = 0;
        for (let num of nums) {
            sum += num;
        }
        return sum;
    }
}