import { Component, Input } from '@angular/core';

import { Card } from './../../domain/models/card';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {
  @Input() card: Card;

  getCol = (): number =>  -10 - (61.46 * (this.card.number -1));
  getRow = (): number =>  -40 - (92 * this.card.suit)
}
