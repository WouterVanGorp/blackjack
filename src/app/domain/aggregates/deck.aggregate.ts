import { Aggregate } from './aggregate';
import { DeckEntity } from '../entities';
import { filter } from 'rxjs/operators';
import { PlayerType } from '../value-types';
import { GiveEvent, Publisher, TurnEvent, RequestCardEvent } from '../events';
import { ResumeEvent } from '@domain/events/ui';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class Deck extends Aggregate {
    private _self: PlayerType = PlayerType.Deck;
    private _deck: DeckEntity = new DeckEntity();
    private _turnCount: number = 0;

    public constructor(private publisher: Publisher) {
        super();
    }

    public init(): void {
        this.publisher.listen(TurnEvent).pipe(filter(x => x.for === this._self)).subscribe(x => {
            this._turnCount = 0;
            let turn = 0;
            this._deck.create();
            this._deck.shuffle();
            this.giveCards(turn);
            this._turnCount = turn + 1;
        });

        this.publisher.listen(ResumeEvent).pipe(filter(_ => this._turnCount <= 3)).subscribe(x => {
            let turn = this._turnCount;
            this.giveCards(turn);
            this._turnCount = turn + 1;
        });

        this.publisher.listen(RequestCardEvent).subscribe(x => {
            let card = this._deck.draw();
            card.isOpen = true;
            this.publisher.publish(GiveEvent, {card, to: x.who});
        });
    }

    private giveCards(num: number) {
        if (num === 0) {
            let card = this._deck.draw();
            card.isOpen = true;
            this.publisher.publish(GiveEvent, {card, to: PlayerType.Player});
            return;
        }
        if (num === 1) {
            let card = this._deck.draw();
            card.isOpen = true;
            this.publisher.publish(GiveEvent, {card, to: PlayerType.Dealer});
            return;
        }
        if (num === 2) {
            let card = this._deck.draw();
            card.isOpen = true;
            this.publisher.publish(GiveEvent, {card, to: PlayerType.Player});
            return;
        }
        if (num === 3) {
            let card = this._deck.draw();
            this.publisher.publish(GiveEvent, {card, to: PlayerType.Dealer});
            return;
        }
    }
}