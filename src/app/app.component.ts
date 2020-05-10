import { Component, OnInit } from '@angular/core';
import { Card, Suit, PlayerType } from '@domain/value-types';
import { Publisher, RequestCardEvent, PassEvent } from '@domain/events';
import { StartEvent, HandUpdatedEvent } from '@domain/events/ui';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Publisher]
})
export class AppComponent implements OnInit {

  card0: Card = { suit: Suit.Hearts, number: 9, value: [9], isOpen: false };
  card1: Card = { suit: Suit.Spades, number: 4, value: [4], isOpen: true };
  card2: Card = { suit: Suit.Diamonds, number: 12, value: [12, 2], isOpen: true }

  dealer$: Observable<any>;

  constructor(private publisher: Publisher) {    
  }

  ngOnInit(): void {
    this.publisher.publish(StartEvent);

    this.dealer$ = this.publisher.listen(HandUpdatedEvent)
    .pipe(map(p => p.newHand));
  }

  onHit = () => this.publisher.publish(RequestCardEvent, new RequestCardEvent({ who: PlayerType.Player }));
  onPass = () => this.publisher.publish(PassEvent, new PassEvent({ who: PlayerType.Player }));
}
