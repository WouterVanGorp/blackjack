import { Component, OnInit } from '@angular/core';
import { Card, Suit } from '@domain/value-types';
import { Domain } from '@domain/domain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private domain: Domain;

  card1: Card = { suit: Suit.Spades, number: 4, value: [4], isOpen: true };
  card2: Card = { suit: Suit.Diamonds, number: 12, value: [12, 2], isOpen: true }

  public ngOnInit() {
    this.domain.init();
  }
}
