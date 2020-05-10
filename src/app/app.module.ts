import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardViewComponent } from './components/card-view/card-view.component';
import { PlayAreaComponent } from './components/play-area/play-area.component';

@NgModule({
  declarations: [
    AppComponent,
    CardViewComponent,
    PlayAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
