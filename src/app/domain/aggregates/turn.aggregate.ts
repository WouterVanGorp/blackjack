import { Aggregate } from './aggregate';
import { Publisher, TurnEvent, PassEvent } from '@domain/events';
import { StartEvent } from '@domain/events/ui';
import { PlayerType } from '@domain/value-types';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class TurnAggregate extends Aggregate {
    public constructor(private publisher: Publisher) {
        super();
    }

    public init() {
        this.publisher.listen(StartEvent).subscribe(x => {
            this.publisher.publish(TurnEvent, { for: PlayerType.Deck });
        });

        this.publisher.listen(PassEvent).subscribe(x => {
            let next: PlayerType;
            switch (x.who) {
                case PlayerType.Dealer:
                    next = null;
                    break;
                case PlayerType.Deck:
                    next = PlayerType.Player;
                    break;
                case PlayerType.Player:
                    next = PlayerType.Dealer;
                    break;
            }
            if (next != null) {
                this.publisher.publish(TurnEvent, { for: next });
            }
        })
    }
}