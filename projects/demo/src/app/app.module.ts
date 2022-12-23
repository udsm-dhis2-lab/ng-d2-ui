import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgD2UiModule } from 'projects/d2-ui/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgD2UiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
