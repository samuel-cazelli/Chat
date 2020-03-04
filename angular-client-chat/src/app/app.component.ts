import { Component, OnInit  } from '@angular/core';

import { RealTimeServiceService } from './services/real-time-service.service';

import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(public realTimeService: RealTimeServiceService) {
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
  }

}
