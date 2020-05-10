import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Hand } from '@domain/entities';
import { PlayerType } from '@domain/value-types';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.scss']
})
export class PlayAreaComponent implements OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log(changes);
  }

  @Input() player: { hand: Hand, role: PlayerType };

  @Output() userAction: EventEmitter<'HIT' | 'PASS'> = new EventEmitter<'HIT' | 'PASS'>();

  isPlayer = () => this.player && this.player.role === PlayerType.Player;

  onHit = () => this.userAction.emit('HIT');
  onPass = () => this.userAction.emit('PASS');
}
