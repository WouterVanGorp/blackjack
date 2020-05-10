import { Component, OnInit } from '@angular/core';

import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Domain } from '@domain/domain';
import { Hand } from '@domain/entities';
import { PlayerType } from '@domain/value-types';
import { StartEvent, HandUpdatedEvent } from '@domain/events/ui';
import { Publisher, RequestCardEvent, PassEvent } from '@domain/events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  dealer$: Observable<{ hand: Hand, role: PlayerType }>;
  player$: Observable<{ hand: Hand, role: PlayerType }>;

  constructor(
    private publisher: Publisher,
    private domain: Domain,
  ) {}

  ngOnInit(): void {
    this.domain.init();
    this.setupListeners();
    this.publisher.publish(StartEvent);
  }

  private setupListeners() {
    this.dealer$ = this.publisher.listen(HandUpdatedEvent)
      .pipe(
        filter(p => p.for === PlayerType.Dealer),
        map(p => ({ hand: p.newHand, role: p.for })),
      );

    this.player$ = this.publisher.listen(HandUpdatedEvent)
      .pipe(
        filter(p => p.for === PlayerType.Player),
        map(p => ({ hand: p.newHand, role: p.for })),
      );
  }

  userAction(action : 'HIT' | 'PASS') {
    if(action === 'HIT') this.onHit();
    else if(action === 'PASS') this.onPass();
  }

  onHit = () => this.publisher.publish(RequestCardEvent, new RequestCardEvent({ who: PlayerType.Player }));
  onPass = () => this.publisher.publish(PassEvent, new PassEvent({ who: PlayerType.Player }));
}
