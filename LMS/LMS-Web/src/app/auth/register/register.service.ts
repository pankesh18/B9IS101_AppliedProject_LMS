import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { APIURL } from '../../appsetting';
import { LMSUser } from '../auth.models';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  APIURL: string = APIURL

  constructor( private http: HttpClient) { }



  public registerUser(objLMSUser: LMSUser): Observable<any> {

    let httpheaders = new HttpHeaders()
    httpheaders.append('content-type', 'application/json')
    httpheaders.append('Access-Control-Allow-Origin', '*')
    httpheaders.append('Accept', 'application/json')

    let httpOptions = { headers: httpheaders }



    return this.http.post<any>(this.APIURL + "LMSUser/RegisterUser", objLMSUser, httpOptions).pipe(
      tap(res => res)
    );
  }

}
