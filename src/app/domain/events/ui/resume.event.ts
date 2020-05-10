import { DomainEvent } from '../domain.event';

/**
 * Should be thrown by the UI to indicate the next action can be taken
 */
export class ResumeEvent extends DomainEvent {
    public constructor() {
        super();
    }
}