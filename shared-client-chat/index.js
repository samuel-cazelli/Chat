"use strict"

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';


export class RealTime {

  constructor() {
    this.hubConnection = undefined;
  }

  connect() {

    this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:5001/chatHub").build();

    this.hubConnection.on('NewMessage', (message) => {
      if (this.onNewMessage) {
        this.onNewMessage(`${message}`);
      }
    });

    return this.hubConnection.start();

  }

  logIn(nick) {
    return this.hubConnection.invoke("LogIn", nick)
  }

  sendMessage(message) {
    this.hubConnection.invoke("SendMessage", message).catch(function (err) {
      return console.error(err.toString());
    });
  }

}

