import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as signalR from '@microsoft/signalr'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public connection : signalR.HubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7098/chat")
  .configureLogging(signalR.LogLevel.Information)
  .build()

  public messages$ = new BehaviorSubject<any>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  constructor() { 
    this.start();
    this.connection.on("ReceiveMessage", (user: string, message: string, messageTime: string) =>{
      this.messages = [...this.messages, {user, message, messageTime}]
      this.messages$.next(this.messages)
    })

    this.connection.on("ConnectedUser", (users: any) =>{
      this.connectedUsers$.next(users)
    })

  }
  public async start(){
    try {
      this.connection.start();
      console.log("Connection Succeeded!")
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        this.start();
      }, 5000);
    }
  }

  public async joinRoom(user: string, room: string){
   return this.connection.invoke("JoinRoom", {user, room})
  }


  public async sendMessage(message: string){
    return this.connection.invoke("SendMessage", message)
   }


   public async leaveChat(){
    return this.connection.stop()
   }

}
