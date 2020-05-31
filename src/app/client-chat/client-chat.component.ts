import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import {SocketService} from '../services/socket.service'
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-client-chat',
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.css'],
  providers: [ChatService]
})
export class ClientChatComponent implements OnInit {
  msg:string;
  closeResult: string;

  constructor( private http: HttpClient,private router: Router,private chatService: ChatService) { }
  ngOnInit(){
    const socket = this.chatService.getSocket();
    let userName = ''
    socket.on('room-created',(roomName)=>{
      console.log('room created');
      if(roomName===userName){
        socket.emit('join-room',roomName);
      }
    });
    
    document.getElementById('chat_submit').addEventListener('click', () => {
      userName = (<HTMLInputElement>document.getElementById('user_chat')).value;
      this.http.post<any>('http://10.0.0.39:5000/room', { userName })
        .subscribe(data => {
          console.log('sent');
        })
        this.router.navigate(['/chat']);
    });
    

    $(function () {
      $(".chatheader").click(function (e) {
        if ($(".chat_container").is(":visible")) {
          $(".chatheader .h_font_color .mini").text("+")
        } else {
          $(".chatheader .h_font_color .mini").text("-")
        }
        $(".chat_container").slideToggle("slow");
        return false
      });

    });
  }


}
