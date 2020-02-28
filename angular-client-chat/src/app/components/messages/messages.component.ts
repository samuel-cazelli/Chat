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

  messages: { id: BigInteger, content: string, nick: string, date: Date }[];

  @Input()
  realTimeService: RealTimeServiceService;

  constructor() { }

  ngOnInit() {
  }

  handleClickSendMessage(message: string) {
    this.realTimeService.sendMessage(message);
  }

  scrolledUp() {
    this.realTimeService.getMessages(this.messages[0].id)
      .then((response) => {
        this.messages = response.concat(this.messages);
      });
    console.log(this.messages);
  }

  loadMessages() {
    this.realTimeService.getMessages(0)
      .then((response) => {
        this.messages = response;
        this.scrollChatToEnd(true);
      });
  }

  newMessage(message) {
    this.messages.push(message);
    this.scrollChatToEnd(false);
  }

  scrollChatToEnd(force) {
    setTimeout(() => {
      const scrollSize = this.messagesElement.nativeElement.scrollHeight;
      const currentScrollPosition = this.messagesElement.nativeElement.scrollTop;
      const divSize = this.messagesElement.nativeElement.clientHeight;

      // if it's at the end of chat scroll to show new message
      if (force || (currentScrollPosition + divSize - scrollSize) > -100) {
        this.messagesElement.nativeElement.scrollTo(0, scrollSize);
      }
    }, 50);
  }

}
