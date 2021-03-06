import { Aggregate } from './aggregate';
import { Publisher, GiveEvent } from '@domain/events';
import { filter } from 'rxjs/operators';
import { PlayerType } from '@domain/value-types';
import { Injectable } from '@angular/core';
import { Hand } from '@domain/entities';
import { HandUpdatedEvent, BustEvent } from '@domain/events/ui';

@Injectable({ providedIn: 'root' })
export class PlayerAggregate extends Aggregate {
    private _self: PlayerType = PlayerType.Player;
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
            if (this._hand.value > 21) {
                this.publisher.publish(BustEvent, { who: PlayerType.Player });
            }
        });
    }
}