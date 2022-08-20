import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { APIURL } from '../appsetting';
import { LMSUser } from '../auth/auth.models';
import { GroupMeeting } from '../batch/batch.models';

@Injectable({
  providedIn: 'root'
})
export class CoursedetailService {
  APIURL: string = APIURL

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

  public GetBatchDetails(BatchId: number) {
    let httpOptions = {
      headers: this.httpheaders,
      params: { BatchId: BatchId }
    }
    return this.http.get<any>(this.APIURL + "Batch/GetBatchDetails", httpOptions).pipe(
      tap(res => res)
    );
  }


  public StartGroupMeeting(objGroupMeeting: GroupMeeting) {
    let httpOptions = {
      headers: this.httpheaders,
    }
    return this.http.post<any>(this.APIURL + "Batch/StartGroupMeeting", objGroupMeeting, httpOptions).pipe(
      tap(res => res)
    );
  }


  public GetGroupMeetings(BatchId: number, UserId: number) {
    let httpOptions = {
      headers: this.httpheaders,
      params: { BatchId: BatchId, UserId: UserId }
    }
    return this.http.get<any>(this.APIURL + "Batch/GetGroupMeetings", httpOptions).pipe(
      tap(res => res)
    );
  }



}
