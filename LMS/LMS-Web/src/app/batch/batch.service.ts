import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Batch, BatchFiles, StudentMeeting } from './batch.models';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  APIURL: string = "https://localhost:44301/api/"

  httpheaders: HttpHeaders 


  constructor(private http: HttpClient) {
    this.httpheaders = new HttpHeaders()
    this.httpheaders.append('content-type', 'application/json')
    this.httpheaders.append('Access-Control-Allow-Origin', '*')
    this.httpheaders.append('Accept', 'application/json')
  }



  public GetAllStudents() {
 

    return this.http.get<any>(this.APIURL + "Batch/GetAllStudents").pipe(
      tap(res => res)
    );
  }




  public CreateBatch(objBatch: Batch): Observable<any> {

 
    let httpOptions = { headers: this.httpheaders }

    return this.http.post<any>(this.APIURL + "Batch/CreateBatch", objBatch, httpOptions).pipe(
      tap(res => res)
    );
  }


  public GetAllBatches() {
    let httpOptions = { headers: this.httpheaders }
    return this.http.get<any>(this.APIURL + "Batch/GetAllBatches", httpOptions).pipe(
      tap(res => res)
    );
  }


  public AddMeeting(objStudentMeeting: StudentMeeting) {
    let httpOptions = {
      headers: this.httpheaders
    }
    return this.http.post<any>(this.APIURL + "Batch/AddMeeting", objStudentMeeting, httpOptions).pipe(
      tap(res => res)
    );
  }

  public AddFileToBatch(objForm: FormData) {
    let httpOptions = {
      headers: this.httpheaders
    }
    return this.http.post<any>(this.APIURL + "Batch/AddFilesToBatch", objForm, httpOptions).pipe(
      tap(res => res)
    );
  }
}
