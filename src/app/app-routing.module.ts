import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from '../app/app.component';
import {ChatMessagesComponent} from '../app/chat-messages/chat-messages.component';
import {ClientChatComponent} from '../app/client-chat/client-chat.component';
import {LoginComponent} from '../app/login/login.component';
import {NavbarComponent} from '../app/navbar/navbar.component';
import { Routes, RouterModule } from '@angular/router'; 
import {PortalComponent} from '../app/portal/portal.component';
import {HomeComponent} from '../app/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatMessagesComponent},
  {path : 'portal', component:PortalComponent},
  // { path: 'login/portal', component: LoginComponent },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ] 
})

export class AppRoutingModule { }
