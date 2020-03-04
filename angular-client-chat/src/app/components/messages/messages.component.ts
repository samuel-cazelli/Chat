import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewChecked } from '@angular/core';

import { RealTimeServiceService } from '../../services/real-time-service.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewChecked {

  @ViewChild('messagesElement', { static: true })
  messagesElement: ElementRef;

  messages: { id: number, content: string, nick: string, date: Date, isMessageMine: boolean }[];

  numberOfUnreadMessages: number;

  flagShouldScrollChatToBotton: boolean;

  @Input()
  realTimeService: RealTimeServiceService;

  constructor() {
    this.numberOfUnreadMessages = 0;
    this.flagShouldScrollChatToBotton = false;
  }

  ngOnInit() {

    this.realTimeService.getMessages(0)
      .then((response) => {
        this.messages = response;
        this.scrollChatToBottom(true);
      });

    this.realTimeService.subscribeOnNewMessageEvent('MessagesComponent', this.handleOnNewMessage.bind(this));
  }

  ngAfterViewChecked() {
    if (this.flagShouldScrollChatToBotton) {
      this.flagShouldScrollChatToBotton = false;
      this.messagesElement.nativeElement.scrollTo(0, this.messagesElement.nativeElement.scrollHeight);
    }
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

  scrollChatToBottom(force: boolean) {
    if (force || this.isChatScrolledToBottom()) {
      this.flagShouldScrollChatToBotton = true;
    }
  }

  isChatScrolledToBottom() {
    const scrollSize = this.messagesElement.nativeElement.scrollHeight;
    const currentScrollPosition = this.messagesElement.nativeElement.scrollTop;
    const divSize = this.messagesElement.nativeElement.clientHeight;
    return (currentScrollPosition + divSize - scrollSize) > -100;
  }

}
