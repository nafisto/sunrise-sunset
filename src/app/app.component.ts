import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClockService } from './clock.service';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  private _clockSub: Subscription;
  private Times = {
    20180302: { rise: moment('2018-03-02 06:39'), set: moment('2018-03-02 18:03') },
    20180303: { rise: moment('2018-03-03 06:38'), set: moment('2018-03-03 18:04') },

    20180304: { rise: moment('2018-03-04 06:36'), set: moment('2018-03-04 18:04') },
    20180305: { rise: moment('2018-03-05 06:35'), set: moment('2018-03-05 18:05') },
    20180306: { rise: moment('2018-03-06 06:33'), set: moment('2018-03-06 18:06') },
    20180307: { rise: moment('2018-03-07 06:32'), set: moment('2018-03-07 18:07') },
    20180308: { rise: moment('2018-03-08 06:31'), set: moment('2018-03-08 18:08') },
    20180309: { rise: moment('2018-03-09 06:29'), set: moment('2018-03-09 18:09') },
    20180310: { rise: moment('2018-03-10 06:28'), set: moment('2018-03-10 18:10') },

    20180311: { rise: moment('2018-03-11 07:26'), set: moment('2018-03-11 19:11') },
    20180312: { rise: moment('2018-03-12 07:25'), set: moment('2018-03-12 19:12') },
    20180313: { rise: moment('2018-03-13 07:23'), set: moment('2018-03-13 19:13') },
    20180314: { rise: moment('2018-03-14 07:22'), set: moment('2018-03-14 19:14') },
    20180315: { rise: moment('2018-03-15 07:20'), set: moment('2018-03-15 19:15') },
    20180316: { rise: moment('2018-03-16 07:19'), set: moment('2018-03-16 19:16') },
    20180317: { rise: moment('2018-03-17 07:17'), set: moment('2018-03-17 19:17') },

    20180318: { rise: moment('2018-03-18 07:16'), set: moment('2018-03-18 19:18') },
    20180319: { rise: moment('2018-03-19 07:14'), set: moment('2018-03-19 19:19') },
    20180320: { rise: moment('2018-03-20 07:13'), set: moment('2018-03-20 19:20') },

  };

  public name: string;
  public time: Date;
  public timeUntil: Date;
  public isNawRuz = false;

  constructor(private clock: ClockService) { }

  updateNextEvent = (time) => {
    this.isNawRuz = false;
    this.time = time;
    const now = moment(time);
    const today = moment(time).format('YYYYMMDD');
    const tomorrow = moment(time).add(1, 'day').format('YYYYMMDD');
    const times = this.Times[today];
    if (now.isBefore(times.rise)) {
      this.name = 'Sunrise';
      this.time = times.rise;
    } else if (now.isBefore(times.set)) {
      this.name = 'Sunset';
      this.time = times.set;
    } else {
      // after sunset, so show next day
      this.name = 'Sunrise';
      if (this.Times[tomorrow]) {
        this.time = this.Times[tomorrow].rise;
      } else {
        this.isNawRuz = true;
      }
    }
  }

  ngOnInit() {
    this._clockSub = this.clock.getClock().subscribe(this.updateNextEvent);
  }

  ngOnDestroy() {
    this._clockSub.unsubscribe();
  }

}
