import { Dealer as DealerAggregate, Deck as DeckAggregate, PlayerAggregate, TurnAggregate } from '@domain/aggregates';

export class Domain {
    public dealer: DealerAggregate;
    public deck: DeckAggregate;
    public player: PlayerAggregate;
    public turn: TurnAggregate;

    public init() {
        this.dealer.init();
        this.deck.init();
        this.player.init();
        this.turn.init();
    }
}