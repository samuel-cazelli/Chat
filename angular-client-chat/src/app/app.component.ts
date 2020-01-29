import { Component, OnInit } from '@angular/core';

import { RealTimeServiceService } from './services/real-time-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  messages: string[];

  constructor(private realTimeService: RealTimeServiceService) {
    this.messages = [];
  }

  ngOnInit(): void {

    this.realTimeService.connect()
      .then(() => {
        console.log('Connection started!');
        this.realTimeService.sendMessage('angular', 'connected');
      })
      .catch(err => console.log('Error while establishing connection :('));

    this.realTimeService
      .onNewMessage = (message) => {
        this.messages.push(message);
      };

  }

  handleClickSend(nick: string, message: string) {
    this.realTimeService.sendMessage(nick, message);
  }

}
