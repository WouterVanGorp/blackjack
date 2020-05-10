import { Entity } from '../entities/entity';
import { DeckEntity, Hand } from '../entities';

export class Dealer extends Entity {
    deck: DeckEntity;
    hand: Hand;
}