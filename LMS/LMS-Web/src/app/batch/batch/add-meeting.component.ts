import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { LMSUser } from '../../auth/auth.models';
import { Batch, StudentMeeting } from '../batch.models';
import { BatchService } from '../batch.service';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import * as $ from 'jquery';
import { LoginService } from '../../auth/login/login.service';


@Component({
  selector: 'add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./batch.component.css']
})
export class AddMeetingComponent implements OnInit, DoCheck {
  BatchName: string;
  CourseName: string;
  BatchYear: any;
  objBatch: Batch;
  objStudents: LMSUser[] = [];
  selectedStudents: LMSUser[] = [];
  items: MenuItem[];
  stepIndex: number = 0;
  MeetingTopic: string;
  MeetingStartTime: any;
  @Input() BatchId: number;
  LoggedInUser: LMSUser;
  MeetingList: StudentMeeting[] = [];

  constructor(private dialogService: DialogService, private objBatchService: BatchService, private loginService: LoginService, private primengConfig: PrimeNGConfig) {
    this.items = [
      { label: 'Step 1: Batch Details' },
      { label: 'Step 2: Add Meetings' },
      { label: 'Step 3: Add Files' }
    ];

    this.LoggedInUser = loginService.getLoggedInUser();

  }
  ngDoCheck(): void {
    this.checkwidth()
    }

  ngOnInit(): void {
    console.log(this.BatchId)
    this.GetAllMeetingsByBatchId(this.BatchId);
  }

  addMeeting() {



    let objStudentMeeting = new StudentMeeting()
    objStudentMeeting.BatchId = this.BatchId;
    objStudentMeeting.HostEmail = this.LoggedInUser.Email
    objStudentMeeting.Topic = this.MeetingTopic
    objStudentMeeting.StartTime = this.MeetingStartTime

    this.MeetingList.push(objStudentMeeting);

    this.objBatchService.AddMeeting(objStudentMeeting)
      .subscribe((response) => {
 
        this.stepIndex = 1

      }, function (rejection) {

      })
  }


  checkwidth() {
    if ($(".p-calendar").css("width") != "100%") {
      $(".p-calendar").css("width", "100%")
    }
    
    
  }



  GetAllMeetingsByBatchId(BatchId: number) {
    this.objBatchService.GetAllMeetingsByBatchId(this.BatchId)
      .subscribe((response) => {
        if (response != null && response != undefined) {
          this.MeetingList = response;

        }

      }, function (rejection) {

      })
  }





}
