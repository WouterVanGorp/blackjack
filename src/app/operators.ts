import { Observable, Subject, interval } from "rxjs";

export function lag<T>(time: number): (source: Observable<T>) => Observable<T> {
    let newSource = new Subject<T>();
    let buffer: T[] = [];
    interval(time).subscribe(() => {
        if (buffer.length === 0) {
            return;
        }
        let item = buffer.shift();
        newSource.next(item);
    });

    return source => {
        source.subscribe({
            next: x => {
                buffer.push(x);
            },
            error: err => newSource.error(err),
            complete: () => newSource.complete(),
        })
        return newSource;
    }
}
