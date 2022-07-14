import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LMSUser } from '../auth.models';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  APIURL: string = "https://localhost:44301/api/"

  constructor( private http: HttpClient) { }

  //httpOptions = {
  //  headers:HttpHeaders {
  //    "Access-Control-Allow-Origin":"*"
  //  }
  //}

  public registerUser(objLMSUser: LMSUser): Observable<any> {

    let httpheaders = new HttpHeaders()
    httpheaders.append('content-type', 'application/json')
    httpheaders.append('Access-Control-Allow-Origin', '*')
    httpheaders.append('Accept', 'application/json')

    //httpheaders.append('Access-Control-Allow-Methods', '*')
    //httpheaders.append('Access-Control-Allow-Headers', '*')
    let httpOptions = { headers: httpheaders }



    var body = JSON.stringify(objLMSUser);
    //var headerOptions = new Headers({
    //  'content-type': 'application/json',
    //  'Access-Control-Allow-Origin': '*',
    //  'Access-Control-Allow-Methods': '*',
    //  'Access-Control-Allow-Headers': '*',

    //})
   // var requestOptions = new RequestOptions({method: RequestMethod })
    let num=12

    return this.http.post<any>(this.APIURL + "LMSUser/RegisterUser", objLMSUser, httpOptions).pipe(
      tap(res => res)
    );
  }

}
