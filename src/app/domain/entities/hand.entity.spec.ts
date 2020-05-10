import { Hand } from "./hand.entity"
import { TestBed } from '@angular/core/testing';

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
        it('should add the card', () => {
            
        })
    })
});