import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  APIURL: string = "https://localhost:44301/api/"
  constructor(private http: HttpClient) { }


  public GetUserDetails(UserId: number) {

    return this.http.get<any>(this.APIURL + "LMSUser/GetUserDetails", { params: { UserId: UserId } }).pipe(
      tap(res => res)
    );
  }


  public GetBatchMeetingDetails(BatchMeetingId: number) {

    return this.http.get<any>(this.APIURL + "Batch/GetBatchMeetingDetails", { params: { BatchMeetingId: BatchMeetingId } }).pipe(
      tap(res => res)
    );
  }


  public GetGroupMeetingDetails(GroupMeetingId: number) {

    return this.http.get<any>(this.APIURL + "Batch/GetGroupMeetingDetails", { params: { GroupMeetingId: GroupMeetingId } }).pipe(
      tap(res => res)
    );
  }

}
