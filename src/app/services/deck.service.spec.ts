import { TestBed } from "@angular/core/testing"
import { DeckService } from './deck.service'

describe('DeckService', () => {
    let service: DeckService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DeckService]
        });
        service = TestBed.get(DeckService);
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
});