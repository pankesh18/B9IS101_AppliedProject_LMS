import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LMSUser } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';
import { LoginService } from '../../auth/login/login.service';
import { Batch } from '../batch.models';
import { BatchService } from '../batch.service';
import { AddMeetingComponent } from './add-meeting.component';
import { CreateBatchComponent } from './create-batch.component';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css'],
  providers: [MessageService]
})
export class BatchComponent implements OnInit {
  ref: DynamicDialogRef
  Batches: Batch[] = [];
  meetingDialog: boolean;
  selectedbatchId: number;
  isMeetingShow: boolean;
  isFileShow: boolean;
  LoggedInUser: LMSUser;
  constructor(private dialogService: DialogService, private objBatchService: BatchService, private objLoginService: LoginService, private auth: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.LoggedInUser = this.auth.getLoggedInUser()
    this.GetAllBatches(this.LoggedInUser.UserId)
  }




  showCreateBatch() {
    this.ref = this.dialogService.open(CreateBatchComponent, {
      header: 'Create Batch',
      width: '70%',
      height: '85%',
      contentStyle: {  "overflow": "auto" },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe(() => {
      this.GetAllBatches(this.LoggedInUser.UserId)
    })
  }

  GetAllBatches(UserId:number) {


    this.objBatchService.GetAllBatches(UserId)
      .subscribe((response) => {
        if (response != null) {
          this.Batches = response;
          this.Batches.forEach(item => item.BatchYear = new Date(item.BatchYear))
        }


      }, function (rejection) {

      })
  }



  showMeetings(BatchId: number) {
    
    this.selectedbatchId = BatchId;
  }



  UpdateBatch(objBatch: Batch) {


    this.objBatchService.UpdateBatch(objBatch)
      .subscribe((response) => {

        this.messageService.add({ severity: 'success', summary: 'Success', detail:  " Batch Updated successfully" });

        console.log(this.Batches)

      }, function (rejection) {

      })
  }



}
