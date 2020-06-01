import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    var username="";
    var password="";
    document.getElementById('login_submit').addEventListener('click', () => {
      username = (<HTMLInputElement>document.getElementById('login_username')).value;
      password = (<HTMLInputElement>document.getElementById('login_password')).value;
      this.http.post<any>('http://10.0.0.39:5000/login', {username,password})
        .subscribe(data => {
        
        })
    });
  }

}
