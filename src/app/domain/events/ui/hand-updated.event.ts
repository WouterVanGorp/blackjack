import { DomainEvent } from '../domain.event';
import { Hand } from '@domain/entities';
import { Card, PlayerType } from '@domain/value-types';

/**
 * Thrown whenever a card was received by a player
 */
export class HandUpdatedEvent extends DomainEvent {
    /**
     * Who has a new hand?
     */
    public for: PlayerType;

    /**
     * The previous hand
     */
    public previousHand: Hand;

    /**
     * The new hand
     */
    public newHand: Hand;

    /**
     * What new card the player gained
     */
    public newCards: Card[];

    /**
     * Difference in total hand value
     */
    public diffValue: number | number[];
}