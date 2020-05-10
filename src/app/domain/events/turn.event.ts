import { DomainEvent } from "./domain.event";
import { PlayerType } from '../value-types';

export class TurnEvent extends DomainEvent {
    public constructor(init: TurnEvent) {
        super(init);
    }

    public for: PlayerType;
}