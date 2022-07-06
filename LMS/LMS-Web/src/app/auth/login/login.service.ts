import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { tap } from 'rxjs';
import { LMSUser } from '../auth.models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  APIURL: string = "https://localhost:44301/api/"
  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  public isLogin() {
    var item = localStorage.getItem('LoggedInUser');
    if (item != null && item != undefined) {
      return true
    } else {
      return false
    }
  }


  public loginUser(UserEmail: string, UserPassword:string) {
    let httpheaders = new HttpHeaders()
    httpheaders.append('content-type', 'application/json')
    httpheaders.append('Access-Control-Allow-Origin', '*')
    httpheaders.append('Accept', 'application/json')
    let httpOptions = { headers: httpheaders }

    return this.http.get<any>(this.APIURL + "LMSUser/LoginUser", { params: { UserEmail: UserEmail, UserPassword: UserPassword } }).pipe(
      tap(res => res)    
    );
  }
}
