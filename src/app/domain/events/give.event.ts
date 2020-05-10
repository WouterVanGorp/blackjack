import { DomainEvent } from './domain.event';
import { PlayerType, Card } from '../value-types';

export class GiveEvent extends DomainEvent {
    public constructor(init: GiveEvent) {
        super(init);
    }

    public to: PlayerType;
    public card: Card;
}