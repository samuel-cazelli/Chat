import { Component, OnInit } from '@angular/core';

import { RealTimeServiceService } from './services/real-time-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  messages: string[];

  isLoggedIn: boolean;

  constructor(private realTimeService: RealTimeServiceService) {
    this.messages = [];
    this.isLoggedIn = false;
  }

  ngOnInit(): void {

    this.realTimeService.connect()
      .then(() => {
        console.log('Connection started!');
      })
      .catch(err => console.log('Error while establishing connection :('));

    this.realTimeService
      .onNewMessage = (message) => {
        this.messages.push(message);
      };

  }

  handleClickSendMessage(message: string) {
    this.realTimeService.sendMessage(message);
  }

  handleClickLogIn(nick: string) {
    this.realTimeService.logIn(nick);
    this.isLoggedIn = true;
  }

}
