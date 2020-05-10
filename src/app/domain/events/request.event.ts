import { DomainEvent } from './domain.event';
import { PlayerType } from '../value-types';

export class RequestEvent extends DomainEvent {
    public constructor(init: RequestEvent) {
        super(init);
    }
    
    public who: PlayerType;
}