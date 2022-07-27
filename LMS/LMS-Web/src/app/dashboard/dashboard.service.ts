import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  APIURL: string = "https://localhost:44301/api/"

  httpheaders: HttpHeaders 

  constructor(private http: HttpClient) {
    this.httpheaders = new HttpHeaders()
    this.httpheaders.append('content-type', 'application/json')
    this.httpheaders.append('Access-Control-Allow-Origin', '*')
    this.httpheaders.append('Accept', 'application/json')
  }


  public GetAllStudentBatches(StudentUserId: number) {
    let httpOptions = { headers: this.httpheaders }
    return this.http.get<any>(this.APIURL + "Batch/GetAllStudentBatches", { params: { StudentUserId: StudentUserId } }).pipe(
      tap(res => res)
    );
  }



  public ZoomTest() {
    let httpOptions = { headers: this.httpheaders }
    return this.http.get<any>(this.APIURL + "Zoom/ZoomTest").pipe(
      tap(res => res)
    );
  }



  public GetAllStudentMetings(StudentUserId: number) {
    let httpOptions = { headers: this.httpheaders }
    return this.http.get<any>(this.APIURL + "Batch/GetAllStudentMetings", { params: { StudentUserId: StudentUserId } }).pipe(
      tap(res => res)
    );
  }


  //public ZoomTest(StudentUserId: number) {
  //  return this.http.get<any>(this.APIURL + "Zoom/ZoomTest").pipe(
  //    tap(res => res)
  //  );
  //}


}
