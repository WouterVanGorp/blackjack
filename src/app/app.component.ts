import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Observable, combineLatest, from, fromEvent } from 'rxjs';
import { map, filter, tap, startWith, pluck, takeUntil } from 'rxjs/operators';

import { Domain } from '@domain/domain';
import { Hand } from '@domain/entities';
import { PlayerType } from '@domain/value-types';
import { StartEvent, HandUpdatedEvent, BustEvent } from '@domain/events/ui';
import { Publisher, RequestCardEvent, PassEvent } from '@domain/events';
import { lag } from './operators';

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
    const dealerEvents$ = combineLatest(
      this.publisher.listen(HandUpdatedEvent).pipe(filter(p => p.for === PlayerType.Dealer)),
      this.publisher.listen(BustEvent).pipe(filter(p => p.who === PlayerType.Dealer), map(_ => true), startWith(false)),
      this.publisher.listen(PassEvent).pipe(filter(p => p.who === PlayerType.Dealer), map(_ => true), startWith(false)),
    ).pipe(
      map(([handUpdated, bust, pass]) => ({ handUpdated, bust, pass })),
      lag(1000)
    );

    const handUpdatedPlayer$ = this.publisher.listen(HandUpdatedEvent).pipe(filter(p => p.for === PlayerType.Player));
    const bustPlayer$ = this.publisher.listen(BustEvent).pipe(filter(p => p.who === PlayerType.Player), map(_ => true), startWith(false));

    this.dealer$ = combineLatest([dealerEvents$.pipe(pluck('handUpdated')), dealerEvents$.pipe(pluck('bust'))])
      .pipe(map(([p, b]) => ({ hand: p.newHand, role: p.for, bust: b })));

    this.player$ = combineLatest([handUpdatedPlayer$, bustPlayer$, dealerEvents$.pipe(pluck('pass'))])
      .pipe(map(([p, b, d]) => ({ hand: p.newHand, role: p.for, bust: b || d })));

    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      tap(console.log),
      takeUntil(this.publisher.listen(PassEvent).pipe(filter(p => p.who === PlayerType.Player)))
    ).subscribe(x => {
      if (x.code === 'Space') {
        this.userAction('HIT');
      } else if (x.code === 'Escape') {
        this.userAction('PASS');
      }
    })
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
