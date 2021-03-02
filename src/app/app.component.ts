import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClockService } from './clock.service';
import { Subscription } from 'rxjs/Subscription';
import * as SunCalc from 'suncalc';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  private _clockSub: Subscription;

  // TODO: make this configurable
  private Lat = 37.426;
  private Lng = -122.121;

  // TODO: make this dynamic to the year and exact equinox
  private FastStart = moment('2021-02-29 18:00');
  private NawRuz = moment('2021-03-19 19:20');

  public name: string;
  public time: Date;
  public timeUntil: Date;
  public isHa = false;
  public isNawRuz = false;

  constructor(private clock: ClockService) { }

  updateNextEvent = (time) => {
    this.isHa = false;
    this.isNawRuz = false;
    this.time = time;
    const now = moment(time);
    const tomorrow = moment(now).add(1, 'day');

    const times = SunCalc.getTimes(now, this.Lat, this.Lng);
    if (now < this.FastStart) {
      this.isHa = true;
    } else  if (now.isBefore(times.sunrise)) {
      this.name = 'Sunrise';
      this.time = times.sunrise;
    } else if (now.isBefore(times.sunset) {
      this.name = 'Sunset';
      this.time = times.sunset;
    } else {
      // after sunset, so show next day
      this.name = 'Sunrise';
      if (now < this.NawRuz) {
        this.time = SunCalc.getTimes(tomorrow, this.Lat, this.Lng).sunrise;
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
