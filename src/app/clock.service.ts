import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ClockService {

  private clock: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

  constructor() {
    interval(1000).subscribe(tick => this.clock.next(new Date()));
  }

  getClock(): Observable<Date> {
    return this.clock;
  }
}
