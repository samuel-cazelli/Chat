import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularChatClient';

  private _hubConnection: HubConnection;


  constructor() { }

  ngOnInit(): void {
    this._hubConnection =  new HubConnectionBuilder().withUrl("https://localhost:44342/chatHub").build();
    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

      this._hubConnection.on('ReceiveMessage', (user: string, message: string) => {
        console.log(`${user} - ${message}`);
      });
    
  }

}
