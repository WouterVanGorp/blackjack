import { DomainEvent } from './domain.event';

export class LoseEvent extends DomainEvent {
    public constructor() {
        super();
    }
}