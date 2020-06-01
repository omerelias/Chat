import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ClientChatComponent } from './client-chat/client-chat.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { PortalComponent } from './portal/portal.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoConfig,SocketIoModule } from 'ngx-socket-io';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { ExamplechatComponent } from './examplechat/examplechat.component';
// import { ChatBuiltComponent } from './chat-built/chat-built.component';

const config: SocketIoConfig = { url: 'http://10.0.0.39:5000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    ClientChatComponent,
    ChatMessagesComponent,
    LoginComponent,
    NavbarComponent,
    PortalComponent,
    HomeComponent,
    // ExamplechatComponent,
    // ChatBuiltComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
