import { DomainEvent } from './domain.event';
import { PlayerType } from '../value-types';

export class PassEvent extends DomainEvent {
    public constructor(init: PassEvent) {
        super(init);
    }
    
    public who: PlayerType;
}