import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.scss'
})
export class JoinRoomComponent implements OnInit {
  joinRoomForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  chatService = inject(ChatService);
  
  
  ngOnInit(): void {
    this.joinRoomForm = this.formBuilder.group({
      user: ['', Validators.required],
      room: ['', Validators.required],
    })
  
  }
  
  joinRoom(){
    const {user, room} = this.joinRoomForm.value;
    sessionStorage.setItem("user", user)
    sessionStorage.setItem("room", room)
    this.chatService.joinRoom(user, room)
    .then(()=>{
      this.router.navigate(['/chat'])
    }).catch((err) => {
      console.log(err)
    })
  }
}
