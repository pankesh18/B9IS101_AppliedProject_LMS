import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { CommonSpaceFile, CommonSpaceGroup } from './common-space.models';
import { param } from 'jquery';
import { LMSUser } from '../auth/auth.models';
import { APIURL } from '../appsetting';

@Injectable({
  providedIn: 'root'
})
export class CommonSpaceService {
  APIURL: string = APIURL
  httpheaders: HttpHeaders


  JsonData = {
    "data":
      [
        {
          "data": {
            "name": "Applications",
            "size": "200mb",
            "type": "Folder",
            "students": ["Student 1", "Student 2"]
          },
          "children": [
            {
              "data": {
                "name": "Angular",
                "size": "25mb",
                "type": "Folder"
              },
              "children": [
                {
                  "data": {
                    "name": "angular.app",
                    "size": "10mb",
                    "type": "Application"
                  }
                },
                {
                  "data": {
                    "name": "cli.app",
                    "size": "10mb",
                    "type": "Application"
                  }
                },
                {
                  "data": {
                    "name": "mobile.app",
                    "size": "5mb",
                    "type": "Application"
                  }
                }
              ]
            },
            {
              "data": {
                "name": "settings.app",
                "size": "50mb",
                "type": "Application"
              }
            }
          ]
        },
        {
          "data": {
            "name": "Cloud",
            "size": "20mb",
            "type": "Folder"
          },
          "children": [
            {
              "data": {
                "name": "backup-1.zip",
                "size": "10mb",
                "type": "Zip"
              }
            },
            {
              "data": {
                "name": "backup-2.zip",
                "size": "10mb",
                "type": "Zip"
              }
            }
          ]
        },
        {
          "data": {
            "name": "Videos",
            "size": "1500mb",
            "type": "Folder"
          },
          "children": [
            {
              "data": {
                "name": "primefaces.mkv",
                "size": "1000mb",
                "type": "Video"
              }
            },
            {
              "data": {
                "name": "intro.avi",
                "size": "500mb",
                "type": "Video"
              }
            }
          ]
        }
      ]
  }






  constructor(private http: HttpClient) {
    this.httpheaders = new HttpHeaders()
    this.httpheaders.append('content-type', 'application/json')
    this.httpheaders.append('Access-Control-Allow-Origin', '*')
    this.httpheaders.append('Accept', 'application/json')
  }




  getFilesystem() {
    return  <TreeNode[]>this.JsonData.data
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




  public CreateCommonSpace(objCommonSpaceGroup: CommonSpaceGroup) {
    let httpOptions = {
      headers: this.httpheaders
    }
    return this.http.post<any>(this.APIURL + "CommonSpace/CreateCommonSpace", objCommonSpaceGroup, httpOptions).pipe(
      tap(res => res)
    );
  }



  public AddCommonSpaceFile(objForm: FormData) {
    let httpOptions = {
      headers: this.httpheaders
    }
    return this.http.post<any>(this.APIURL + "CommonSpace/AddCommonSpaceFile", objForm, httpOptions).pipe(
      tap(res => res)
    );
  }





  public GetCommonSpaceGroup(BatchId: number) {
    let httpOptions = {
      headers: this.httpheaders,
      params: { BatchId: BatchId }
    }
    return this.http.get<any>(this.APIURL + "CommonSpace/GetCommonSpaceGroup",   httpOptions).pipe(
      tap(res => res)
    );
  }

  public GetBatchNotes(BatchId: number, UserId: number, FileId: number, MeetingId: number) {
    let httpOptions = {
      headers: this.httpheaders,
      params: { BatchId: BatchId, UserId: UserId, FileId: FileId, MeetingId: MeetingId }
    }
    return this.http.get<any>(this.APIURL + "Note/GetBatchNotes", httpOptions).pipe(
      tap(res => res)
    );
  }

  public AddCommonSpaceNote(objCommonSpaceFile: CommonSpaceFile) {
    let httpOptions = {
      headers: this.httpheaders,

    }
    return this.http.post<any>(this.APIURL + "CommonSpace/AddCommonSpaceNote", objCommonSpaceFile, httpOptions).pipe(
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
