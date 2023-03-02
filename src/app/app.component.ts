import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClockService } from './clock.service';
import { Subscription } from 'rxjs/Subscription';
import * as SunCalc from 'suncalc';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  private _clockSub: Subscription;

  private lat = 37.426;
  private lng = -122.121;

  // TODO: make this dynamic to the year and exact equinox
  private fastStart = moment(`${moment().year()}-02-28 18:39`);
  private nawRuz = moment(`${moment().year()}-03-20 19:20`);

  public name: string;
  public time: Date;
  public timeUntil: Date;
  public isHa = false;
  public isNawRuz = false;

  constructor(private activatedRoute: ActivatedRoute, private clock: ClockService) {
    this.activatedRoute.queryParamMap.subscribe(paramMap => {
      this.lat = +paramMap.get('lat') || this.lat;
      this.lng = +paramMap.get('lng') || this.lng;
      // tslint:disable-next-line:no-console
      console.debug(`Using location (${this.lat},${this.lng})`);
    });
  }

  updateNextEvent = (time) => {
    this.isHa = false;
    this.isNawRuz = false;
    this.time = time;
    const now = moment(time);
    const tomorrow = moment(now).add(1, 'day');

    const times = SunCalc.getTimes(now, this.lat, this.lng);
    if (now < this.fastStart) {
      this.isHa = true;
    } else  if (now.isBefore(times.sunrise)) {
      this.name = 'Sunrise';
      this.time = times.sunrise;
    } else if (now.isBefore(times.sunset)) {
      this.name = 'Sunset';
      this.time = times.sunset;
    } else {
      // after sunset, so show next day
      this.name = 'Sunrise';
      if (now < this.nawRuz) {
        this.time = SunCalc.getTimes(tomorrow, this.lat, this.lng).sunrise;
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
