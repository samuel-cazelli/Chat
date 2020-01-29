"use strict"

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';


export class RealTime {

  constructor() {
    this.hubConnection = undefined;
  }

  connect() {

    this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:5001/chatHub").build();

    this.hubConnection.on('ReceiveMessage', (user, message) => {
      if (this.onNewMessage) {
        this.onNewMessage(`${user} - ${message}`);
      }
    });

    return this.hubConnection.start();

  }

  sendMessage(user, message) {
    this.hubConnection.invoke("SendMessage", user, message).catch(function (err) {
      return console.error(err.toString());
    });
  }

}

