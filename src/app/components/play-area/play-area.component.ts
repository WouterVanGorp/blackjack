import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Hand } from '@domain/entities';
import { PlayerType } from '@domain/value-types';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.scss']
})
export class PlayAreaComponent {

  @Input() player: { hand: Hand, role: PlayerType };

  @Output() userAction: EventEmitter<'HIT' | 'PASS'> = new EventEmitter<'HIT' | 'PASS'>();

  isPlayer = () => this.player.role === PlayerType.Player;

  onHit = () => this.userAction.emit('HIT');
  onPass = () => this.userAction.emit('PASS');
}
