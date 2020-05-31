import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  JsonPipe
} from "@angular/common";
import io from 'socket.io-client';
import {
  Router
} from '@angular/router';
import {
  ChatService
} from '../services/chat.service';
import {
  HttpClient
} from '@angular/common/http';
import {
  kMaxLength
} from 'buffer';
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'],
  providers: [ChatService]
})
export class PortalComponent implements OnInit {
  roomData: any = [];
  constructor(private router: Router, private chatService: ChatService, private http: HttpClient, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {

    const socket = this.chatService.getSocket();

    this.http.get < any > ("http://10.0.0.39:5000/room").subscribe(data => {
      this.roomData.push(data)
    });

  }

  onClickJoinRoom(data) {
    console.log(data);
    if (data.value.isTaken === false) {
      console.log('Not Full');
    } else {
      console.log('Full');
    }
    this.chatService.getSocket().emit('join-room-admin', data.keys,true); //removed parameter true
    // this.router.navigate(['/chat']);
  };

};
