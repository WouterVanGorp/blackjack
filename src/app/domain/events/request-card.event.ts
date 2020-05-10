import { DomainEvent } from './domain.event';
import { PlayerType } from '../value-types';

export class RequestCardEvent extends DomainEvent {
    public constructor(init: RequestCardEvent) {
        super(init);
    }
    
    public who: PlayerType;
}