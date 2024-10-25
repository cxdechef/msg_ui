import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinRoomComponent } from './components/join-room/join-room.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome',  pathMatch: 'full' },
  {path: 'joinroom', component: JoinRoomComponent },
  {path: 'welcome', component: WelcomeComponent },
  {path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
