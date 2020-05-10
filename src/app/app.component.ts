import { Component } from '@angular/core';
import { Card, Suit } from '@domain/value-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  card0: Card = { suit: Suit.Hearts, number: 9, value: 9, isOpen: false };
  card1: Card = { suit: Suit.Spades, number: 4, value: 4, isOpen: true };
  card2: Card = { suit: Suit.Diamonds, number: 12, value: [12, 2], isOpen: true }
}
