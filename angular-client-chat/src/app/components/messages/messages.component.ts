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
    console.log('scrolled!!');
  }

  loadMessages() {
    this.realTimeService.getMessages(0)
      .then((response) => {
        this.messages = response;
        this.moveChatToEnd();
      });
  }

  newMessage(message){
    this.messages.push(message);
    this.moveChatToEnd();
  }

  moveChatToEnd() {
    setTimeout(() => {
      const scrollSize = this.messagesElement.nativeElement.scrollHeight;
      this.messagesElement.nativeElement.scrollTo(0, scrollSize);
    }, 200);
  }

}
