import { Component, Input } from '@angular/core';

import { Card } from './../../domain/models/card';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {
  @Input() card: Card;
}
