import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { AuthService } from '../auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserEmail: string;
  UserPassword: string;
  constructor(private loginService: LoginService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
  }






  loginUser(UserEmail: string, UserPassword:string) {

    this.loginService.loginUser(UserEmail,UserPassword)
      .subscribe( (response) => {
        console.log(response)
        localStorage.setItem("LoggedInUser", JSON.stringify(response))
        this.router.navigate(['/intermediate'])

      }, function (rejection) {

      })
  }
}
