import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RealTimeServiceService } from '../../services/real-time-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  realTimeService: RealTimeServiceService;

  @Output('onLoginSuccess')
  onLoginSuccess = new EventEmitter();

  errorMessageLogin: string;

  constructor() {
    this.errorMessageLogin = '';
  }

  ngOnInit() {
  }

  handleClickLogIn(nick: string) {
    console.log(this.realTimeService);

    this.realTimeService.logIn(nick).then((result) => {
      if (result.Key) {
        this.onLoginSuccess.emit();
      } else {
        this.errorMessageLogin = result.Value;
      }
    });
  }

}
