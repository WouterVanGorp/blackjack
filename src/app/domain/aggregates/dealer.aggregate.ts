import { DeckEntity, Hand } from '../entities';
import { Aggregate } from './aggregate';
import { Injectable } from '@angular/core';
import { PlayerType } from '@domain/value-types';
import { Publisher, GiveEvent, TurnEvent, RequestCardEvent } from '@domain/events';
import { HandUpdatedEvent, ResumeEvent } from '@domain/events/ui';
import { filter } from 'rxjs/operators';
import { DealerWaitEvent } from '@domain/events/ui/dealer-wait.event';

@Injectable({ providedIn: 'root' })
export class DealerAggregate extends Aggregate {
    private _self: PlayerType = PlayerType.Dealer;
    private _hand: Hand = new Hand();

    public constructor(private publisher: Publisher) {
        super();
    }

    public init() {
        this.publisher.listen(GiveEvent).pipe(filter(x => x.to === this._self)).subscribe(x => {
            this._hand.add(...x.cards);
            this.publisher.publish(HandUpdatedEvent, {
                for: this._self,
                newCards: x.cards,
                newHand: this._hand,
                diffValue: [0],
                previousHand: null,
            });
        });

        this.publisher.listen(TurnEvent).pipe(filter(x => x.for === this._self)).subscribe(x => {
            this.publisher.publish(RequestCardEvent, { who: this._self });
        });

        this.publisher.listen(ResumeEvent).subscribe(x => {
            this.publisher.publish(RequestCardEvent, { who: this._self });
            this.publisher.publish(DealerWaitEvent);
        });
    }
}