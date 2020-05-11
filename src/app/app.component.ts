import { Component, OnInit, AfterViewInit } from '@angular/core';

import { map, filter, tap, startWith } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

import { Domain } from '@domain/domain';
import { Hand } from '@domain/entities';
import { PlayerType } from '@domain/value-types';
import { StartEvent, HandUpdatedEvent, BustEvent } from '@domain/events/ui';
import { Publisher, RequestCardEvent, PassEvent } from '@domain/events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  dealer$: Observable<{ hand: Hand, role: PlayerType, bust: boolean }>;
  player$: Observable<{ hand: Hand, role: PlayerType, bust: boolean }>;

  gameOngoing: boolean = false;

  constructor(
    private publisher: Publisher,
    private domain: Domain,
  ) { }

  ngOnInit(): void {
    this.domain.init();
    this.setupListeners();
  }

  private setupListeners() {
    const handUpdatedDealer$ = this.publisher.listen(HandUpdatedEvent).pipe(filter(p => p.for === PlayerType.Dealer));
    const handUpdatedPlayer$ = this.publisher.listen(HandUpdatedEvent).pipe(filter(p => p.for === PlayerType.Player));

    const bustDealer$ = this.publisher.listen(BustEvent).pipe(filter(p => p.who === PlayerType.Dealer), map(_ => true), startWith(false));
    const bustPlayer$ = this.publisher.listen(BustEvent).pipe(filter(p => p.who === PlayerType.Player), map(_ => true), startWith(false));

    this.dealer$ = combineLatest([handUpdatedDealer$, bustDealer$])
      .pipe(map(([p, b]) => ({ hand: p.newHand, role: p.for, bust: b })));

    this.player$ = combineLatest([handUpdatedPlayer$, bustPlayer$])
      .pipe(map(([p, b]) => ({ hand: p.newHand, role: p.for, bust: b })));
  }

  userAction(action: 'HIT' | 'PASS') {
    if (action === 'HIT') this.onHit();
    else if (action === 'PASS') this.onPass();
  }

  onHit = () => this.publisher.publish(RequestCardEvent, new RequestCardEvent({ who: PlayerType.Player }));
  onPass = () => this.publisher.publish(PassEvent, new PassEvent({ who: PlayerType.Player }));
  start = () => {
    this.publisher.publish(StartEvent);
    this.gameOngoing = true;
  }
}
