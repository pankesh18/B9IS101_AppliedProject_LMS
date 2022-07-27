import { Component, DoCheck, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { LMSUser } from '../../auth/auth.models';
import { Batch } from '../batch.models';
import { BatchService } from '../batch.service';
import { MenuItem } from 'primeng/api';
import * as $ from 'jquery';


@Component({
  selector: 'create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./batch.component.css']
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


  constructor(private dialogService: DialogService, private objBatchService: BatchService) {
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
    this.objBatchService.CreateBatch(this.objBatch)
      .subscribe((response) => {
        this.BatchId = response
      
        console.log(this.BatchId)
        this.stepIndex = 1
      }, function (rejection) {

      })
  }


  checkwidth() {
    $(".p-calendar").css("width", "100%")
  }





}
