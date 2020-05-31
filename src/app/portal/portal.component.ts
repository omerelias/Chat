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
  roomData: any = {};
  constructor(private router: Router, private chatService: ChatService, private http: HttpClient) { }
  updateRoomsData () {
    this.http.get<any>("http://10.0.0.39:5000/room").subscribe(data => {
      this.roomData = data;
    });
  }
  ngOnInit(): void {
   this.updateRoomsData();
   this.chatService.getSocket().on('room-created', this.updateRoomsData.bind(this))
  }

  onClickJoinRoom(data) {
    this.chatService.joinRoom(data.key, true);
    this.router.navigate(['/chat']);
  };

};
