import { SocialAuthService } from '@abacritt/angularx-social-login';
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
  constructor(private loginService: LoginService, private localStorage: LocalStorageService, private router: Router, private authService: SocialAuthService ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.loginUser(user.email, user.id)
      }
    })
  }






  loginUser(UserEmail: string, GoogleUserId:string) {

    this.loginService.loginUser(UserEmail, GoogleUserId)
      .subscribe( (response) => {
        console.log(response)
        localStorage.setItem("LoggedInUser", JSON.stringify(response))
        this.router.navigate(['/intermediate'])

      }, function (rejection) {

      })
  }
}
