import { Injectable } from '@angular/core';
import { RealTime } from 'shared-client-chat';

@Injectable({
  providedIn: 'root'
})
export class RealTimeServiceService extends RealTime {
  [x: string]: any;


  constructor() {
    super();
  }

}
