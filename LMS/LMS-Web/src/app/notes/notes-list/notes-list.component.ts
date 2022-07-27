import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LMSUser } from '../../auth/auth.models';
import { LoginService } from '../../auth/login/login.service';
import { Batch, BatchFiles, StudentMeeting } from '../../batch/batch.models';
import { BatchNote } from '../note.models';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  StudentBatches: Batch[];
  BatchOptions: any[] = [];
  FileList: BatchFiles[] = [];
  FileOptions: any[] = [];
  MeetingList: StudentMeeting[] = [];
  MeetingOptions: any[] = [];
  IsFile: boolean;
  IsMeeting: boolean;
  LoggedInUser: LMSUser; 
  @Input() BatchId: number;
  @Input() IsFromBatch: boolean = false;
  @Input() BatchFileId: number;
  @Input() BatchMeetingId: number;
  @Input() IsFromFile: boolean = false;
  @Input() IsFromMeeting: boolean = false;
  @Input() IsNoteView: boolean = false;
  selectedBatchNoteId: number;
  BatchNoteList: BatchNote[] = [];
  selectednote: BatchNote;
  IsNoteUpdate: boolean;
  StudentsInBatch: LMSUser[] = [];
  selectedStudents: LMSUser[]=[];
  constructor(private objNotesService: NotesService, private objLoginService: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.LoggedInUser = this.objLoginService.getLoggedInUser();
    this.route.params.subscribe(params => {
      this.selectedBatchNoteId = params['BatchNoteId']
    })
    if (!this.IsFromBatch) {
      this.GetAllBatches(this.LoggedInUser.UserId);
    }
    else {
      if (this.IsFromFile) {
        this.GetBatchNotes(this.BatchId, this.BatchFileId, 0)

      }
      else if (this.IsFromMeeting) {
        this.GetBatchNotes(this.BatchId, 0, this.BatchMeetingId)

      }
    }


 
  }


  GetAllBatches(UserId: number) {
    this.BatchOptions = [];
    this.objNotesService.GetAllStudentBatches(UserId)
      .subscribe((response) => {
        this.StudentBatches = response;
        this.StudentBatches.forEach(item => {
          let batch = { name: item.BatchName.concat('-', new Date(item.BatchYear).getFullYear().toString()), value: item.BatchId }
          this.BatchOptions.push(batch);
        })
        console.log(response)


      }, function (rejection) {

      })
  }


  onBatchChange(BatchId: number) {
    this.GetAllFilesByBatchId(BatchId)
    this.GetAllMeetingsByBatchId(BatchId)
  }




  GetAllFilesByBatchId(BatchId: number) {
    this.FileOptions = [];
    this.objNotesService.GetAllFilesByBatchId(BatchId)
      .subscribe((response) => {
        if (response != null && response != undefined) {
          this.FileList = response;
          this.FileList.forEach(item => {
            let file = { name: item.FileName.concat(item.FileExtension), value: item.BatchFileId }
            this.FileOptions.push(file);
          })

          this.IsFile = true;

        }
        else {
          this.FileList = [];
        }

      }, function (rejection) {

      })
  }

  GetAllMeetingsByBatchId(BatchId: number) {
    this.MeetingOptions = [];
    this.objNotesService.GetAllMeetingsByBatchId(BatchId)
      .subscribe((response) => {
        if (response != null && response != undefined) {
          this.MeetingList = response;
          this.MeetingList.forEach(item => {
            let meeting = { name: item.Topic, value: item.BatchMeetingId }
            this.MeetingOptions.push(meeting);
          })
          this.IsMeeting = true;

        }

      }, function (rejection) {

      })
  }


  GetAllStudentsInBatch(BatchId: number) {
    this.StudentsInBatch=[]
    this.objNotesService.GetAllStudentsInBatch(BatchId)
      .subscribe((response) => {
        if (response != null && response != undefined) {
          this.StudentsInBatch = response
          let i = this.StudentsInBatch.findIndex(item => item.UserId == this.LoggedInUser.UserId)
          this.StudentsInBatch.splice(i, 1)
        }

      }, function (rejection) {

      })
  }



  GetBatchNotes(BatchId: number, FileId: number=0, MeetingId: number=0) {



    this.objNotesService.GetBatchNotes(BatchId, this.LoggedInUser.UserId, FileId, MeetingId)
      .subscribe((response) => {
        this.BatchNoteList = response;
        if (this.BatchNoteList != null) {
          if (this.selectedBatchNoteId != null && this.selectedBatchNoteId != undefined) {
            let note = this.BatchNoteList.find(item => { return item.BatchNoteId == this.selectedBatchNoteId })
            if (note != undefined) {
              this.viewNote(note);
            }

          }
        }


      }, function (rejection) {

      })
  }



  goToFile(BatchId: number, BatchFileId: number, BatchNoteId:number) {
    this.router.navigate(['/coursedetail', BatchId, { BatchFileId: BatchFileId, BatchNoteId: BatchNoteId } ])
  }


  viewNote(note: BatchNote) {
    this.selectednote = note;
    this.IsNoteView = true;
/*    this.objNotesService.Note.next(note);*/
  }







  ShareBatchNote(users: LMSUser[], BatchId: number, BatchNoteId: number) {



    this.objNotesService.ShareBatchNote(users, BatchId, BatchNoteId)
      .subscribe((response) => {


      }, function (rejection) {

      })
  }






}
