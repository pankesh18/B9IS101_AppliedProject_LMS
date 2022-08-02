import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { tap } from 'rxjs';
import { LMSUser } from '../auth.models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  APIURL: string = "https://localhost:44301/api/"
  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router) {

    //if (!this.isLogin()) {
    //  this.router.navigate(['/login'])
    //}

  }

  //public isLogin() {
  //  var item = localStorage.getItem('LoggedInUser');
  //  if (item != null && item != undefined) {
  //    return true
  //  } else {
  //    return false
  //  }
  //}

  //public getLoggedInUser() {
  //  var item = localStorage.getItem('LoggedInUser');

  //  if (item === null || item === "null" || item === undefined) {
  //    this.logout()
  //    return new LMSUser;


  //  } else {

  //    return JSON.parse(item) as LMSUser;;
  //  }
      
  //}


  //logout() {
  //  //this.authservice.logout();
  //  this.localStorage.remove('LoggedInUser')
  //  this.router.navigate(['/'])
  //}





  public loginUser(UserEmail: string, GoogleUserId:string) {
    let httpheaders = new HttpHeaders()
    httpheaders.append('content-type', 'application/json')
    httpheaders.append('Access-Control-Allow-Origin', '*')
    httpheaders.append('Accept', 'application/json')
    let httpOptions = { headers: httpheaders }

    return this.http.get<any>(this.APIURL + "LMSUser/LoginUser", { params: { UserEmail: UserEmail, GoogleUserId: GoogleUserId } }).pipe(
      tap(res => res)    
    );
  }






}
