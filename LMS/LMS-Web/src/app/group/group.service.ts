import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { APIURL } from '../appsetting';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  APIURL: string = APIURL
  httpheaders: HttpHeaders 
  constructor(private http: HttpClient) {
    this.httpheaders = new HttpHeaders()
    this.httpheaders.append('content-type', 'application/json')
    this.httpheaders.append('Access-Control-Allow-Origin', '*')
    this.httpheaders.append('Accept', 'application/json')
  }

  public GetAllStudentsInBatch(BatchId: number) {
    let httpOptions = {
      headers: this.httpheaders,
      params: { BatchId: BatchId }
    }
    return this.http.get<any>(this.APIURL + "Note/GetAllStudentsInBatch", httpOptions).pipe(
      tap(res => res)
    );
  }
}
