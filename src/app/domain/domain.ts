import { Dealer as DealerAggregate, Deck as DeckAggregate, PlayerAggregate, TurnAggregate } from '@domain/aggregates';

export class Domain {
    public dealer: DealerAggregate = new DealerAggregate();
    public deck: DeckAggregate = new DeckAggregate();
    public player: PlayerAggregate = new PlayerAggregate();
    public turn: TurnAggregate = new TurnAggregate();

    public init() {
        this.dealer.init();
        this.deck.init();
        this.player.init();
        this.turn.init();
    }
}