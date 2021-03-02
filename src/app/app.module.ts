import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { ClockService } from './clock.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MomentModule, RouterModule.forRoot([])
  ],
  providers: [ClockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
