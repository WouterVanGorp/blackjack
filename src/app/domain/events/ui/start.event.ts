import { DomainEvent } from '../domain.event';

/**
 * Should be thrown by the UI when a new game starts
 */
export class StartEvent extends DomainEvent {
    public constructor() {
        super();
    }
}