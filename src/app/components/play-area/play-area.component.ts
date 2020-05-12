import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Hand } from '@domain/entities';
import { PlayerType, Card } from '@domain/value-types';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.scss']
})
export class PlayAreaComponent {

  @Input() player: { hand: Hand, role: PlayerType, bust: boolean };

  @Output() userAction: EventEmitter<'HIT' | 'PASS'> = new EventEmitter<'HIT' | 'PASS'>();

  public passed = false;

  isPlayer = () => this.player.role === PlayerType.Player;

  onHit = () => this.userAction.emit('HIT');
  onPass = () => {
    this.userAction.emit('PASS');
    this.passed = true;
  };

  trackByFn(index: number, item: Card) {
    if (item.isOpen)
      return index;
    return -1;
  }
}
