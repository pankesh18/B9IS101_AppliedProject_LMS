import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LMSUser } from '../auth/auth.models';
import { BatchNote } from './note.models';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  APIURL: string = "https://localhost:44301/api/"
  public Note = new BehaviorSubject<BatchNote>(new BatchNote());

  public persistNote = this.Note.asObservable();




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



  public AddBatchNote(objBatchNote: BatchNote) {
    let httpOptions = { headers: this.httpheaders }
    return this.http.post<any>(this.APIURL + "Note/AddBatchNote", objBatchNote).pipe(
      tap(res => res)
    );
  }

  public GetBatchNotes(BatchId: number, UserId:number, FileId: number, MeetingId: number) {
    let httpOptions = {
      headers: this.httpheaders,
      params: { BatchId: BatchId, UserId: UserId, FileId: FileId, MeetingId: MeetingId }
    }
    return this.http.get<any>(this.APIURL + "Note/GetBatchNotes", httpOptions).pipe(
      tap(res => res)
    );
  }
  public UpdateBatchNote(objBatchNote: BatchNote) {
    let httpOptions = { headers: this.httpheaders }
    return this.http.post<any>(this.APIURL + "Note/UpdateBatchNote", objBatchNote).pipe(
      tap(res => res)
    );
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


  public ShareBatchNote(users: LMSUser[], BatchId: number, BatchNoteId: number) {
    let httpOptions = {
      headers: this.httpheaders,
      params: { BatchId: BatchId, BatchNoteId: BatchNoteId }
    }
    return this.http.post<any>(this.APIURL + "Note/ShareBatchNote", users, httpOptions).pipe(
      tap(res => res)
    );
  }
}
