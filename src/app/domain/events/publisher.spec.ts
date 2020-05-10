import { Publisher } from "./publisher"
import { TestBed, async } from '@angular/core/testing';
import { StartEvent } from './start.event';
import { WinEvent } from './win.event';

describe('Publisher', () => {
    let publisher: Publisher;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Publisher],
        });
        publisher = TestBed.get(Publisher);
    });

    it('should create', () =>{
        expect(publisher).toBeTruthy();
    });

    it('should not throw when listened to', async(() => {
        publisher.listen(StartEvent).subscribe();
        expect().nothing();
    }));

    it('should not throw when publishing', () => {
        publisher.publish(StartEvent);
        expect().nothing();
    });

    it('should receive message when listened to', async(() => {
        publisher.listen(StartEvent).subscribe(x => expect().nothing());
        publisher.publish(StartEvent);
    }));

    it('should not receive message when different event is published', async(() => {
        publisher.listen(StartEvent).subscribe(x => expect(true).toBeFalse());
        publisher.publish(WinEvent);
        expect().nothing();
    }));
});