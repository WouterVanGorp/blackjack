import { DeckEntity, Hand } from '../entities';
import { Aggregate } from './aggregate';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class Dealer extends Aggregate {
    deck: DeckEntity;
    hand: Hand;
}