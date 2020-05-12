import { DeckEntity, Hand } from '../entities';
import { Aggregate } from './aggregate';
import { Injectable } from '@angular/core';
import { PlayerType } from '@domain/value-types';
import { Publisher, GiveEvent, TurnEvent, RequestCardEvent, PassEvent } from '@domain/events';
import { HandUpdatedEvent, ResumeEvent, BustEvent } from '@domain/events/ui';
import { filter, map, combineLatest, tap, withLatestFrom } from 'rxjs/operators';
import { DealerWaitEvent } from '@domain/events/ui/dealer-wait.event';
import { iif } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DealerAggregate extends Aggregate {
    private _self: PlayerType = PlayerType.Dealer;
    private _hand: Hand = new Hand();
    private _myTurn: boolean = false;

    public constructor(private publisher: Publisher) {
        super();
    }

    public init() {
        this.publisher.listen(GiveEvent).pipe(
            filter(x => x.to === this._self),
            map(x => x.cards),
            withLatestFrom(this.publisher.listen(HandUpdatedEvent).pipe(filter(x => x.for === PlayerType.Player), map(x => x.newHand))),
        ).subscribe(([newCards, playerHand]) => {
            this._hand.add(...newCards);
            this.publisher.publish(HandUpdatedEvent, {
                for: this._self,
                newCards: newCards,
                newHand: new Hand({ ...this._hand }),
                diffValue: [0],
                previousHand: null,
            });
            if (this._hand.value > 21) {
                this.publisher.publish(BustEvent, { who: this._self });
                return;
            }

            if (this._myTurn) {
                this.takeTurn(this._hand, playerHand);
            }
        })

        this.publisher.listen(TurnEvent).pipe(
            filter(x => x.for === this._self),
            withLatestFrom(this.publisher.listen(HandUpdatedEvent).pipe(filter(x => x.for === PlayerType.Player), map(x => x.newHand)))
        ).subscribe(([x, playerHand]) => {
            this._myTurn = true;
            this._hand.showCards();
            this.publisher.publish(HandUpdatedEvent, {
                for: PlayerType.Dealer,
                diffValue: 0,
                newCards: [],
                newHand: new Hand({ ...this._hand }),
                previousHand: this._hand,
            });
            this.takeTurn(this._hand, playerHand);
        });

        this.publisher.listen(ResumeEvent).subscribe(x => {
            this.publisher.publish(RequestCardEvent, { who: this._self });
            this.publisher.publish(DealerWaitEvent);
        });
    }

    private takeTurn(hand: Hand, playerHand: Hand) {
        if (hand.value < playerHand.value) {
            this.publisher.publish(RequestCardEvent, { who: this._self });
        } else {
            this.publisher.publish(PassEvent, { who: this._self });
        }
    }
}