import { DeckEntity, Hand } from '../entities';
import { Aggregate } from './aggregate';
import { Injectable } from '@angular/core';
import { PlayerType } from '@domain/value-types';
import { Publisher, GiveEvent } from '@domain/events';
import { HandUpdatedEvent } from '@domain/events/ui';
import { filter } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DealerAggregate extends Aggregate {
    private _self: PlayerType = PlayerType.Dealer;
    private _hand: Hand = new Hand();

    public constructor(private publisher: Publisher) {
        super();
    }

    public init() {
        this.publisher.listen(GiveEvent).pipe(filter(x => x.to === this._self)).subscribe(x => {
            this._hand.add(x.card);
            this.publisher.publish(HandUpdatedEvent, {
                for: this._self,
                newCard: x.card,
                newHand: this._hand,
                diffValue: [0],
                previousHand: null,
            });
        });
    }}