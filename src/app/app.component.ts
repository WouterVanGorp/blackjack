import { Component } from '@angular/core';
import { Card, Suit } from './domain/models/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  card1: Card = { suit: Suit.Spades, number: 4, value: 4 };
  card2: Card = { suit: Suit.Diamonds, number: 12, value: [12, 2] }
}
