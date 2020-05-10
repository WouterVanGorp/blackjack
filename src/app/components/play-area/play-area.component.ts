import { Component, OnInit, Input, Output } from '@angular/core';
import { Hand } from '@domain/entities';
import { PlayerType } from '@domain/value-types';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.scss']
})
export class PlayAreaComponent {

  @Input() player: { hand: Hand, role: PlayerType };

  // @Output() userAction: EventEmitter = new EventEmitter();

  isPlayer = () => this.player.role === PlayerType.Player;

  

  // onHit = () => this.userAction.emit('HIT');
  // onPass = () => this.userAction.emit('PASS');
}
