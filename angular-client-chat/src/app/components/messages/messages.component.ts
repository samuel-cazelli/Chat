import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

import { RealTimeServiceService } from '../../services/real-time-service.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @ViewChild('messagesElement', { static: true })
  messagesElement: ElementRef;

  messages: { id: BigInteger, content: string, nick: string, date: Date, isMessageMine: boolean }[];

  numberOfUnreadMessages: number;

  @Input()
  realTimeService: RealTimeServiceService;

  constructor() {
    this.numberOfUnreadMessages = 0;
  }

  ngOnInit() {
    this.realTimeService.subscribeOnNewMessageEvent('MessagesComponent', this.handleOnNewMessage.bind(this));
  }

  handleOnNewMessage(message) {
    this.messages.push(message);
    this.scrollChatToBottom(false);

    if (!this.isChatScrolledToBottom()) {
      this.numberOfUnreadMessages += 1;
    }

  }

  handleClickSendMessage(message: string) {
    this.realTimeService.sendMessage(message);
  }

  handleScrolledDown() {
    if (this.isChatScrolledToBottom()) {
      this.numberOfUnreadMessages = 0;
    }
  }

  handleScrolledUp() {
    this.realTimeService.getMessages(this.messages[0].id)
      .then((response) => {
        this.messages = response.concat(this.messages);
      });
  }

  loadInitialMessages() {
    this.realTimeService.getMessages(0)
      .then((response) => {
        this.messages = response;
        this.scrollChatToBottom(true);
      });
  }

  scrollChatToBottom(force) {
    setTimeout(() => {
      // if it's at the bottom of chat scroll to show new message
      if (force || this.isChatScrolledToBottom()) {
        this.messagesElement.nativeElement.scrollTo(0, this.messagesElement.nativeElement.scrollHeight);
      }
    }, 50);
  }

  isChatScrolledToBottom() {
    const scrollSize = this.messagesElement.nativeElement.scrollHeight;
    const currentScrollPosition = this.messagesElement.nativeElement.scrollTop;
    const divSize = this.messagesElement.nativeElement.clientHeight;
    return (currentScrollPosition + divSize - scrollSize) > -100;
  }

}
