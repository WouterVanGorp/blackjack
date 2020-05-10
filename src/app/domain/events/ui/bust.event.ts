import { DomainEvent } from '../domain.event';
import { PlayerType } from '@domain/value-types';

/**
 * Is thrown whenever anyone is bust (i.e. has a point value > 21)
 */
export class BustEvent extends DomainEvent {
    /**
     * Who is bust?
     */
    public who: PlayerType;
}