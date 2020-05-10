import { DomainEvent } from '../domain.event';
import { PlayerType } from '@domain/value-types';

export class BustEvent extends DomainEvent {
    public who: PlayerType;
}