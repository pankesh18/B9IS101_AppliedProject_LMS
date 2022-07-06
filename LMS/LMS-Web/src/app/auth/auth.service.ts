import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, tap } from 'rxjs';
import { LMSUser, UserProfile } from './auth.models'


const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '936277757414-hmmhl3rn4falcjefkn0jeu5dec35otur.apps.googleusercontent.com',
  userinfoEndpoint: 'https://localhost:9443/oauth2/userinfo',
  scope: 'openid profile email'

}




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile: UserProfile = new UserProfile;

  APIURL: string ="https://localhost:44301/api/"


  constructor(private readonly oAuthService: OAuthService, private http: HttpClient) {


    //oAuthService.configure(oAuthConfig)
    //oAuthService.logoutUrl = 'https://www.google.com/accounts/logout'
    //if (!oAuthService.hasValidAccessToken()) {
    //  oAuthService.loadDiscoveryDocument().then(() => {
    //    oAuthService.tryLoginImplicitFlow().then(() => {
    //      oAuthService.initLoginFlow()

    //    })
    //  })

    //}
    //else {

    //  //var up = this.oAuthService.loadUserProfile()


    //  oAuthService.loadUserProfile().then((userProfile) => {
        

    //    console.log(JSON.stringify(userProfile))

    //  })

    //}

  }




  isLogin() {

    console.log(this.oAuthService.getAccessToken())
    return this.oAuthService.hasValidAccessToken()
  }


  login() {



    this.oAuthService.configure(oAuthConfig)
    this.oAuthService.logoutUrl = 'https://www.google.com/accounts/logout'
    if (!this.isLogin()) {
      this.oAuthService.loadDiscoveryDocument().then(() => {
        this.oAuthService.tryLoginImplicitFlow().then(() => {
          this.oAuthService.initLoginFlow()
          
        })
      })

    }
    else {

      var up = this.oAuthService.loadUserProfile()
      

      this.oAuthService.loadUserProfile().then((userProfile) => {

        this.userProfile = userProfile as UserProfile;
        console.log('first login: ', JSON.stringify(this.userProfile))

      })

    }







  }

  loadUser() {
    this.oAuthService.loadUserProfile().then((userProfile) => {
      this.userProfile = userProfile as UserProfile;
    })
  }


  getUserProfile() {
    ////if (this.isLogin()) {
    ////  return this.userProfile
    ////}
    ////else {
    //  this.loadUser()
    //  return this.userProfile
    ///*    }*/

    console.log('testing')
    this.oAuthService.loadUserProfile().then((userProfile) => {
      this.userProfile = userProfile as UserProfile;
      console.log('INFO login: ', JSON.stringify(this.userProfile))
    })
   

    
  }

  logout() {
    this.oAuthService.logOut();
  }












  //public GetCoursesForSchedule(): Observable<any> {
  //  return this.http.get<any>(this.ServiceBaseUrl + "CourseBatch/GetCoursesForSchedule").pipe(
  //    tap(res => res)
  //  );
  //}











}






