import { Component, DoCheck, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { LMSUser } from '../../auth/auth.models';
import { Batch } from '../batch.models';
import { BatchService } from '../batch.service';
import { MenuItem } from 'primeng/api';
import * as $ from 'jquery';
import { LoginService } from '../../auth/login/login.service';
import { AuthService } from '../../auth/auth.service';
import {  MessageService } from 'primeng/api';


@Component({
  selector: 'create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./batch.component.css'],
  providers: [MessageService]
})
export class CreateBatchComponent implements OnInit, DoCheck {
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
  BatchId: number;
  LoggedInUser: LMSUser;
  stateOptions: any[];
  IsGroupMeetingAllowed: boolean = false;
  constructor(private dialogService: DialogService, private objBatchService: BatchService, private objLoginService: LoginService, private auth: AuthService, private messageService: MessageService) {
    this.stateOptions = [{ label: 'No', value: false }, { label: 'Yes', value: true }];


    this.items = [
      { label: 'Step 1: Batch Details' },
      { label: 'Step 2: Add Meetings' },
      { label: 'Step 3: Add Files' }
    ];
  }
  ngDoCheck(): void {
    this.checkwidth()
    }

  ngOnInit(): void {
    this.GetAllStudents();
    this.LoggedInUser = this.auth.getLoggedInUser()
  }

  GetAllStudents() {


    this.objBatchService.GetAllStudents()
      .subscribe((response) => {
        this.objStudents = response;


      }, function (rejection) {

      })
  }


  CreateBatch() {

    this.objBatch= new Batch()
    this.objBatch.BatchName = this.BatchName
    this.objBatch.CourseName = this.CourseName
    this.objBatch.BatchYear = this.BatchYear
    this.objBatch.BatchStudents = this.selectedStudents
    this.objBatch.CreatedBy = this.LoggedInUser.UserId
    this.objBatch.IsGroupMeetingAllowed = this.IsGroupMeetingAllowed
    this.objBatchService.CreateBatch(this.objBatch)
      .subscribe((response) => {
        this.BatchId = response
        this.messageService.add({ severity: 'success', summary: 'Success', detail: " Batch Created successfully" });

        console.log(this.BatchId)
        this.stepIndex = 1
      }, function (rejection) {

      })
  }


  checkwidth() {
    $(".p-calendar").css("width", "100%")
  }





}
