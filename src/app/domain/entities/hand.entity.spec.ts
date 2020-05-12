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

        let testDecks = [
            { numbers: [5], expected: 5 },
            { numbers: [10], expected: 10 },
            { numbers: [11], expected: 10 },
            { numbers: [12], expected: 10 },
            { numbers: [13], expected: 10 },
            { numbers: [1], expected: 11 },
            { numbers: [5, 9], expected: 14 },
            { numbers: [12,13], expected: 20 },
            { numbers: [1,5], expected: 16 },
            { numbers: [1, 11], expected: 21 },
            { numbers: [12,13], expected: 20 },
            { numbers: [1, 3, 11], expected: 14 },
            { numbers: [2, 3, 11], expected: 15 },
            { numbers: [2, 3, 11, 9], expected: 24 },
            { numbers: [1, 1, 1, 1], expected: 14 },
        ];
        for (let deck of testDecks) {
            it(`should have a value of ${deck.expected} for the deck ${deck.numbers}`, () => {
                let suits = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
                let cards = deck.numbers.map(n => {
                    let suit = suits[Math.floor(Math.random() * 4)];
                    return CardFactory.create(suit, n);
                });
                hand.add(...cards);
                expect(hand.value).toBe(deck.expected);
            });
        }
    });
});