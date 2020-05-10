import { Injectable, Type, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DomainEvent } from './domain.event';

@Injectable({providedIn: 'root'})
export class Publisher implements OnDestroy {
    private _publisher = new Subject<PublishedEvent>();

    public publish<T extends DomainEvent>(type: Type<T>, payload?: T) {
        this._publisher.next({
            type,
            payload,
        });
    }

    public listenToAll(): Observable<PublishedEvent> {
        return this._publisher.asObservable();
    }

    public listen<T extends DomainEvent>(type: Type<T>): Observable<T> {
        return this._publisher.pipe(filter(e => e.type === type), map(e => e.payload));
    }

    public ngOnDestroy(): void {
        this._publisher.complete();
    }
}

export interface PublishedEvent<T = any> {
    type: Type<T>;
    payload: T;
}