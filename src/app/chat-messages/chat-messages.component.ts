import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import io from 'socket.io-client';
// import {SocketService} from '../services/socket.service';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ChatService]
})
export class ChatMessagesComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {


    var msgArr=[];
    var i=0;
    var input = document.getElementById("msgcontent");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    document.getElementById("send_msg").click();
  }
});




    const socket = this.chatService.getSocket();
     socket.on('message',(msg)=>{
       document.getElementById("messages").innerHTML += 
       `<div class="d-flex justify-content-start mb-4">
         <div class="img_cont_msg">
         <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">
       </div>
         <div class="msg_cotainer">
         `+msg+`
         <br>
           </div>
         </div>
       </div>`;
      
     })

    document.getElementById('send_msg').addEventListener('click',()=>{
      var myMsg = (<HTMLInputElement>document.getElementById('msgcontent'))
      socket.emit('message',myMsg.value)

        document.getElementById("messages").innerHTML += 
        `<div class="d-flex justify-content-end mb-4">
          <div class="msg_cotainer_send">
            `+myMsg.value+`
          </div>
          <div class="img_cont_msg">
        <img src="../assets/images/default.jpg" class="rounded-circle user_img_msg">
          </div>
        </div>`;

      (<HTMLInputElement>document.getElementById('msgcontent')).value = '';
      // addToHtml(myMsg.value);
      
    });
      // <span class="msg_time">8:40 AM, Today</span>
  
    
  //   socket.on('broadcast',function(data) {
  //     document.write(data.description);
  //  });
  }

}




