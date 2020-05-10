import { DomainEvent } from './domain.event';

export class StartEvent extends DomainEvent {
    public constructor() {
        super();
    }
}