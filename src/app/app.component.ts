import { Component } from '@angular/core';
import { ChatService } from "./services/chat.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = "Socket.IO chat"
    sender = ''
    receiver = ''
    message = ''
    messageArray: Array<{ sender: string, receiver: string, message: string }> = []
    chatWindow: boolean=false;

    constructor(private chatService: ChatService) {
        this.chatService.newUserJoined()
            .subscribe()
        this.chatService.userLeft()
            .subscribe()
        this.chatService.messageReceived()
            .subscribe(data => {
                this.messageArray.push(data)})
    }

    join() {
        this.chatService.joinRoom({ sender: this.sender, receiver: this.receiver })
        this.chatWindow=true;
    }
    leave() {
        this.chatService.leaveRoom({ sender: this.sender, receiver: this.receiver })
        this.chatWindow=false;
    }
    send() {
        this.chatService.sendMessage({ sender: this.sender, receiver: this.receiver, message: this.message })
        this.message = ''
    }
}
