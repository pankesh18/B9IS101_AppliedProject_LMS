import { Component, Input, OnInit } from '@angular/core';
import { LMSUser } from '../../auth/auth.models';
import { LoginService } from '../../auth/login/login.service';
import { Batch, BatchFiles, StudentMeeting } from '../../batch/batch.models';
import { BatchNote } from '../note.models';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.css']
})
export class CreateNotesComponent implements OnInit {
  text: string;
  noteTitle: string;
  StudentBatches: Batch[];
  BatchOptions: any[]=[];
  FileList: BatchFiles[] = [];
  FileOptions: any[] = [];
  MeetingList: StudentMeeting[] = []
  MeetingOptions: any[] = []


  @Input() objBatchNote: BatchNote; 

  @Input() BatchId: number;
  @Input() IsFromBatch: boolean = false;


  @Input() BatchFileId: number=0;
  @Input() IsFromFile: boolean = false;
  IsFile: boolean = false;
  @Input() BatchMeetingId: number=0;
  @Input() IsFromMeeting: boolean = false;


  @Input() IsNoteUpdate: boolean = false;

  IsMeeting: boolean = false;
  loggednInUser: LMSUser;
  constructor(private objNotesService: NotesService, private objLoginService: LoginService ) { }

  ngOnInit(): void {
    this.loggednInUser = this.objLoginService.getLoggedInUser();
    if (this.IsNoteUpdate) {


    }
    else {
      this.objBatchNote = new BatchNote()
      this.GetAllBatches(this.loggednInUser.UserId);
    }


  }



  sumbit() {
    console.log(this.text)
  }


  GetAllBatches(UserId: number) {
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


  onBatchChange() {
    this.GetAllFilesByBatchId(this.BatchId)
    this.GetAllMeetingsByBatchId(this.BatchId)
  }




  GetAllFilesByBatchId(BatchId: number) {
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


  AddBatchNote(objBatchNote: BatchNote) {
    objBatchNote.BatchId = this.BatchId
    objBatchNote.BatchFileId = this.BatchFileId
    objBatchNote.BatchMeetingId = this.BatchMeetingId
    objBatchNote.CreatedBy = this.loggednInUser.UserId
    objBatchNote.ReferenceType = this.BatchMeetingId != 0 && this.BatchFileId != 0 ? 3 : this.BatchMeetingId != 0 ? 1: 2
    
    

    this.objNotesService.AddBatchNote(objBatchNote)
      .subscribe((response) => {

        this.objBatchNote = new BatchNote()
      }, function (rejection) {

      })
  }


  UpdateBatchNote(objBatchNote: BatchNote) {
    objBatchNote.BatchId = this.BatchId

    objBatchNote.CreatedBy = this.loggednInUser.UserId
    objBatchNote.ReferenceType = this.BatchMeetingId != 0 && this.BatchFileId != 0 ? 3 : this.BatchMeetingId != 0 ? 1 : 2



    this.objNotesService.UpdateBatchNote(objBatchNote)
      .subscribe((response) => {

        
      }, function (rejection) {

      })
  }

}