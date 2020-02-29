import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { RealTimeServiceService } from './services/real-time-service.service';

import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(MessagesComponent, { static: true })
  messagesElement: MessagesComponent;

  isLoggedIn: boolean;

  constructor(private realTimeService: RealTimeServiceService) {
    this.isLoggedIn = false;
  }

  ngOnInit(): void {

    this.realTimeService.connect()
      .then(() => {
        console.log('Connection started!');
      })
      .catch(err => console.log('Error while establishing connection :('));

  }

  handleLoginSuccess() {
    this.isLoggedIn = true;
    this.messagesElement.loadMessages();
  }

}
