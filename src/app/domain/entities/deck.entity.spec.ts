import { TestBed } from "@angular/core/testing"
import { DeckEntity } from './deck.entity'

describe('DeckService', () => {
    let service: DeckEntity;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DeckEntity]
        });
        service = TestBed.get(DeckEntity);
    });

    it('should create',  () =>{
        expect(service).toBeTruthy();
    });

    it('should have cards', () => {
        expect(service.cards).toBeTruthy();
    });

    describe('create', () => {
        it('should create a deck of cards', () => {
            service.create();
            expect(service.cards.length).toBe(52);
        });
    });

    describe('shuffle', () => {
        it('should shuffle the deck', () => {
            service.create();
            let cards = service.cards;
            service.shuffle();
            let shuffledCards = service.cards;
            expect(shuffledCards).not.toEqual(cards);
        });
    });
});