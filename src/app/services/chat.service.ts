import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'; 
import { Socket } from '../../../node_modules/ngx-socket-io';

@Injectable()
export class ChatService {
    currentRoom = ''
    constructor(private socket: Socket) {}

    leaveRoom () {
        this.socket.emit('leave-room', this.currentRoom);
    }

    joinRoom (userName, isAgent=false) {
        this.currentRoom = userName;
        this.socket.emit('join-room', {userName, isAgent});
    }

    getSocket(){
        return this.socket;
    }
}
