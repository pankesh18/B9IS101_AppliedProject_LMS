import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LMSUser, UserProfile } from './auth.models'


const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '621686135789-hk19l687pm2u9sum04h341pik5lvbsv6.apps.googleusercontent.com',
  userinfoEndpoint: 'https://localhost:9443/oauth2/userinfo',
  scope: 'openid profile email'

}




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile: UserProfile = new UserProfile;

  APIURL: string ="https://localhost:44301/api/"

  public isLogin = new BehaviorSubject<boolean>(false);

  isUserLogin = this.isLogin.asObservable()

  constructor(private http: HttpClient, private authService: SocialAuthService) {

    this.authService.authState
      .subscribe(user => {
        if (user) {
          this.isLogin.next(true);
        }
        else {

        }

    })



  }



  setSocialUserasLMSUser(socialUser: SocialUser) {

  }






  //isLogin() {

  //  console.log(this.oAuthService.getAccessToken())
  //  return this.oAuthService.hasValidAccessToken()
  //}


  //login() {



  //  this.oAuthService.configure(oAuthConfig)
  //  this.oAuthService.logoutUrl = 'https://www.google.com/accounts/logout'
  //  if (!this.isLogin()) {
  //    this.oAuthService.loadDiscoveryDocument().then(() => {
  //      this.oAuthService.tryLoginImplicitFlow().then(() => {
  //        this.oAuthService.initLoginFlow()
          
  //      })
  //    })

  //  }
  //  else {

  //    var up = this.oAuthService.loadUserProfile()
      

  //    this.oAuthService.loadUserProfile().then((userProfile) => {

  //      this.userProfile = userProfile as UserProfile;
  //      console.log('first login: ', JSON.stringify(this.userProfile))

  //    })

  //  }


  //}


}






