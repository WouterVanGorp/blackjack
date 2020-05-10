import { DomainEvent } from '../domain.event';
import { Hand } from '@domain/entities';
import { Card } from '@domain/value-types';

export class HandUpdatedEvent extends DomainEvent {
    public previousHand: Hand;
    public newHand: Hand;
    public newCard: Card;
    public diffValue: number;
}