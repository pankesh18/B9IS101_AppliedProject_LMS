import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ForumComment, ForumQuestion } from './forum.models';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
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


  public PostForumQuestion(objForumQuestion: ForumQuestion) {
    let httpOptions = { headers: this.httpheaders }
    return this.http.post<any>(this.APIURL + "Forum/PostForumQuestion", objForumQuestion).pipe(
      tap(res => res)
    );
  }

  public DeleteForumQuestion(objForumQuestion: ForumQuestion) {
    let httpOptions = { headers: this.httpheaders }
    return this.http.post<any>(this.APIURL + "Forum/DeleteForumQuestion", objForumQuestion).pipe(
      tap(res => res)
    );
  }


  public PostForumComment(objForumComment: ForumComment) {

    return this.http.post<any>(this.APIURL + "Forum/PostForumComment", objForumComment).pipe(
      tap(res => res)
    );
  }
  public DeleteForumComment(objForumComment: ForumComment) {
    let httpOptions = { headers: this.httpheaders }
    return this.http.post<any>(this.APIURL + "Forum/DeleteForumComment", objForumComment).pipe(
      tap(res => res)
    );
  }

  public GetAllDiscussionForum(BatchId: number) {
    let httpOptions = { headers: this.httpheaders }
    return this.http.get<any>(this.APIURL + "Forum/GetAllDiscussionForum", { params: { BatchId: BatchId } }).pipe(
      tap(res => res)
    );
  }



}
