import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { LMSUser } from '../auth.models';
import { AuthService } from '../auth.service';
import { LoginService } from './login.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  UserEmail: string;
  UserPassword: string;
  LMSUser: LMSUser;
  GoogleUser: SocialUser;
  isGoogleLogin: boolean;
  msgs: any[] = [];

  constructor(private loginService: LoginService, private localStorage: LocalStorageService, private router: Router, private authService: SocialAuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.GoogleUser = user
   
        this.UserEmail = this.GoogleUser.email
        this.testImg(this.GoogleUser.photoUrl);
        this.isGoogleLogin = true;
      }
      else {
        this.isGoogleLogin = false;
      }
    })
  }


  gotoRegister() {
    this.router.navigate(['/register'])
  }


  loginUser(UserEmail: string, GoogleUserId:string) {

    this.loginService.loginUser(UserEmail, GoogleUserId)
      .subscribe((response) => {

        if (response != null) {
          this.LMSUser = response;
          this.LMSUser.GoogleUser = this.GoogleUser;
          localStorage.setItem("LoggedInUser", JSON.stringify(response))
          this.router.navigate(['/intermediate'])
        } else {
          this.messageService.add({ severity: 'error', summary: 'Invalid Login', detail: 'The user doesnt exists, please register' });
        }


      }, function (rejection) {

      })
  }



  testImg(url:any) {
    var testImg = new Image();
    var _me = this;
    testImg.addEventListener('load', () => {
      console.log("Image load successfully")
      _me.GoogleUser.photoUrl = url;
    });
    testImg.addEventListener('error', () => {
      console.log("Error in image")
      _me.GoogleUser.photoUrl = "../../../assets/ProfilePic.jpg";
    });

    testImg.src = url;
  }

  displayProfileImage(url: any) {
    console.log("Image load successfully")
    this.GoogleUser.photoUrl = url;
  }
  displayDefaultProfile() {
    console.log("Error in image")
    this.GoogleUser.photoUrl = "../../../assets/ProfilePic.jpg";
  }
}
