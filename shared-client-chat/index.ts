import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

export class RealTime {

    hubConnection: any;
    handlersNewMessage: { name: string, handler: Function }[];

    constructor() {
        this.handlersNewMessage = [];
    }

    connect() {

        this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:5001/chatHub").build();

        this.hubConnection.on('NewMessage', (message: string) => {
            this.handlersNewMessage.forEach(function (item, index) {
                item.handler(message);
            });
        });

        return this.hubConnection.start();

    }

    logIn(nick: string) {
        return this.hubConnection.invoke("LogIn", nick)
    }

    sendMessage(message: string) {
        this.hubConnection.invoke("SendMessage", message).catch(function (err: string) {
            return console.error(err.toString());
        });
    }

    getMessages(startId: number) {
        return this.hubConnection.invoke("GetMessages", startId)
    }

    subscribeOnNewMessageEvent(name: string, handlerNewMessage: Function) {
        this.handlersNewMessage.push({ name: name, handler: handlerNewMessage });
    }

    unSubscribeOnNewMessageEvent(name: string) {
        this.handlersNewMessage = this.handlersNewMessage.filter(function (value, index, arr) {
            return value.name === name;
        });
    }
}