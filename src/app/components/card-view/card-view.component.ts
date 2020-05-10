import { Component, Input } from '@angular/core';

import { Card } from '@domain/value-types';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {
  @Input() card: Card;

  getCol = (): number =>  this.card.isOpen ? this.calcCol(this.card.number) : this.calcCol(1);
  getRow = (): number =>  this.card.isOpen ? this.calcRow(this.card.suit) : this.calcRow(4);

  calcCol = (cardNumber: number): number => -10 - (61.46 * (cardNumber -1));
  calcRow = (cardSuit: number): number => -40 - (92 * cardSuit);
}
