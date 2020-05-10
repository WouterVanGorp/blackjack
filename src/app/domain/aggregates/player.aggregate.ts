import { Aggregate } from './aggregate';
import { Publisher, GiveEvent } from '@domain/events';
import { filter } from 'rxjs/operators';
import { PlayerType } from '@domain/value-types';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PlayerAggregate extends Aggregate {
    private _self: PlayerType = PlayerType.Player;

    public constructor(private publisher: Publisher) {
        super();
    }

    public init() {
        this.publisher.listen(GiveEvent).pipe(filter(x => x.to === this._self)).subscribe(x => {
            
        })
    }
}