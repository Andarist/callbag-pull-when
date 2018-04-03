# callbag-pull-when

Callbag operator that pulls (samples) from source when provided listenable emits. It's [`sampleWhen`](https://github.com/Andarist/callbag-sample-when)'s version - this one works with pullable source, while the other one works with listenables.

It works similar to [Rx's sample](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-sample).

## Example

```js
import forEach from 'callbag-for-each'
import fromIter from 'callbag-from-iter'
import pipe from 'callbag-pipe'
import pullWhen from 'callbag-pull-when'
import timer from 'callbag-timer'

pipe(
  fromIter([10, 20, 30, 40]),
  pullWhen(timer(1000, 2000)),
  forEach(value => {
    // will log 10 after 1 second, and 20, 30, 40 after 2 seconds from each other
    console.log(value)
  }),
)
```
