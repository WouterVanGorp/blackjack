import { Dealer as DealerAggregate, Deck as DeckAggregate, PlayerAggregate, TurnAggregate } from '@domain/aggregates';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Domain {
  
  public constructor(
    public dealer: DealerAggregate,
    public deck: DeckAggregate,
    public player: PlayerAggregate,
    public turn: TurnAggregate
  ) { }

  public init() {
    this.dealer.init();
    this.deck.init();
    this.player.init();
    this.turn.init();
  }
}