import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursedetailService {
  APIURL: string = "https://localhost:44301/api/"

  httpheaders: HttpHeaders 
  constructor(private http: HttpClient) {
    this.httpheaders = new HttpHeaders()
    this.httpheaders.append('content-type', 'application/json')
    this.httpheaders.append('Access-Control-Allow-Origin', '*')
    this.httpheaders.append('Accept', 'application/json')
  }



  public GetAllMeetingsByBatchId(BatchId: number) {
    let httpOptions = {
      headers: this.httpheaders,
      params: { BatchId: BatchId }

    }
    return this.http.get<any>(this.APIURL + "Batch/GetAllMeetingsByBatchId", httpOptions).pipe(
      tap(res => res)
    );
  }


  public GetAllFilesByBatchId(BatchId: number) {
    let httpOptions = {
      headers: this.httpheaders,
      params: { BatchId: BatchId }
    }
    return this.http.get<any>(this.APIURL + "Batch/GetAllFilesByBatchId", httpOptions).pipe(
      tap(res => res)
    );
  }


}
