"use strict"

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';


export class RealTime {

  constructor() {
    this.hubConnection = undefined;
    this.handlersNewMessage = [];
  }

  connect() {

    this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:5001/chatHub").build();

    this.hubConnection.on('NewMessage', (message) => {
      this.handlersNewMessage.forEach(function (item, index) {
        item.handler(message);
      });
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

  getMessages(startId) {
    return this.hubConnection.invoke("GetMessages", startId)
  }

  subscribeOnNewMessageEvent(name, handlerNewMessage) {
    this.handlersNewMessage.push({ name: name, handler: handlerNewMessage });
  }

  unSubscribeOnNewMessageEvent(name) {
    this.handlersNewMessage = this.handlersNewMessage.filter(function (value, index, arr) {
      return value.name === name;
    });
  }


}

