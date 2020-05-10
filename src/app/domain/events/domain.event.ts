export abstract class DomainEvent {
    public constructor(init?: DomainEvent) {
        Object.assign(this, init);
    }
}