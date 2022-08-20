import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;

  UserName: string
  Password: string  
  ClientId: '621686135789-hk19l687pm2u9sum04h341pik5lvbsv6.apps.googleusercontent.com'

  constructor(private authService: SocialAuthService, private oauth: AuthService) { }

  ngOnInit(): void {
    this.getUser()
  }



  signInHandler(): void {
  }


  getUser() {
    this.authService.authState.subscribe(user => {
      console.log(user)
    })
  }

}
