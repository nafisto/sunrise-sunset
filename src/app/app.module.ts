import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { ClockService } from './clock.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MomentModule
  ],
  providers: [ClockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
