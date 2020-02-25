import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      MessagesComponent
   ],
   imports: [
      BrowserModule,
      InfiniteScrollModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
