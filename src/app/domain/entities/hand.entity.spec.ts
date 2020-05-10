import { Hand } from "./hand.entity"
import { TestBed } from '@angular/core/testing';
import { Card, Suit } from '@domain/value-types';
import { CardFactory } from '@domain/factories/card.factory';

describe('Hand', () => {
    let hand: Hand;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Hand],
        });
        hand = TestBed.get(Hand);
    });

    it('should create', () => {
        expect(hand).toBeTruthy();
    });

    describe('add', () => {
        function randomCard(number?: number): Card {
            let suit = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades][Math.floor(Math.random() * 4)];
            number = number ? number : Math.floor(Math.random() * 12 + 1);
            return CardFactory.create(suit, number);
        }
        it('should add the card', () => {
            let cardToAdd = randomCard();
            hand.add(cardToAdd);
            expect(hand.cards.length).toBe(1);
            let otherCardToAdd = randomCard();
            hand.add(otherCardToAdd);
            expect(hand.cards.length).toBe(2);
        });

        function shouldComputeTheValue(numbers: Array<Array<number>>, expected: number) {
            let suit = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades][Math.floor(Math.random() * 4)];
            
        }

        it('should compute the value')
    });
});