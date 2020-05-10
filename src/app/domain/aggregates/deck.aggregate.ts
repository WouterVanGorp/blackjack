import { Aggregate } from './aggregate';
import { DeckEntity } from '../entities';
import { filter } from 'rxjs/operators';
import { PlayerType, Card } from '../value-types';
import { GiveEvent, Publisher, TurnEvent, RequestCardEvent } from '../events';
import { ResumeEvent } from '@domain/events/ui';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DeckAggregate extends Aggregate {
    private _self: PlayerType = PlayerType.Deck;
    private _deck: DeckEntity = new DeckEntity();

    public constructor(private publisher: Publisher) {
        super();
    }

    public init(): void {
        this.publisher.listen(TurnEvent).pipe(filter(x => x.for === this._self)).subscribe(x => {
            this._deck.create();
            this._deck.shuffle();
            this.giveCard(PlayerType.Player, [true, true]);
            this.giveCard(PlayerType.Dealer, [false, true]);
        });

        this.publisher.listen(RequestCardEvent).subscribe(x => {
            let card = this._deck.draw();
            card.isOpen = true;
            this.publisher.publish(GiveEvent, { cards: [card], to: x.who });
        });
    }

    private giveCard(to: PlayerType, open: boolean[]) {
        let cards: Card[] = [];
        for (let o of open) {
            let card = this._deck.draw();
            card.isOpen = o;
            cards.push(card);
        }
        this.publisher.publish(GiveEvent, { cards, to });
        return;
    }
}