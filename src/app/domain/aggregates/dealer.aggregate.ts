import { DeckEntity, Hand } from '../entities';
import { Aggregate } from './aggregate';

export class Dealer extends Aggregate {
    deck: DeckEntity;
    hand: Hand;
}