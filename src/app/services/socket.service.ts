import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
 socket = io('http://10.0.0.39:5000');
 constructor() { }

 getSocket() {
   return this.socket;
 }
}
