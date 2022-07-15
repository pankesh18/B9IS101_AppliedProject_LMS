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
export class AddFilesComponent implements OnInit {

  @Input() BatchId: number;
  LoggedInUser: LMSUser;


  constructor(private dialogService: DialogService, private objBatchService: BatchService, private loginService: LoginService, private primengConfig: PrimeNGConfig) {

    this.LoggedInUser = loginService.getLoggedInUser();

  }
  ngAfterViewInit(): void {
  
    }

  ngOnInit(): void {

  }






}
