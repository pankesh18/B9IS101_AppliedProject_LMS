import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { LMSUser } from '../../auth/auth.models';
import { Batch, BatchFiles, StudentMeeting } from '../batch.models';
import { BatchService } from '../batch.service';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import * as $ from 'jquery';
import { LoginService } from '../../auth/login/login.service';


@Component({
  selector: 'add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./batch.component.css']
})
export class AddFilesComponent implements OnInit {

  @Input() BatchId: number;
  LoggedInUser: LMSUser;
  Files: any[] = [];
  objBatchFiles: BatchFiles;
  FileList: BatchFiles[] = [];
  FileName: string;
  FileCaption: string;
  constructor(private dialogService: DialogService, private objBatchService: BatchService, private loginService: LoginService, private primengConfig: PrimeNGConfig) {

    this.LoggedInUser = loginService.getLoggedInUser();

  }
  ngAfterViewInit(): void {
  
  }

  ngOnInit(): void {

  }


  AddFiles(event:any) {
    console.log(event)
    this.Files = [];
    this.Files.push(event.files[0])
  }

  UploadFile() {

    let ext = this.Files[0].name.substring(this.Files[0].name.lastIndexOf('.'), this.Files[0].name.length);

    let formData = new FormData();
    formData.append("BatchId", JSON.stringify(this.BatchId))
    formData.append("FileName", this.FileName)
    formData.append("Caption", this.FileCaption)
    formData.append("File", this.Files[0])
    formData.append("FileExtension",ext )
    formData.append("FileSize", JSON.stringify(this.Files[0].size / (1024 * 1024)))


    this.objBatchService.AddFileToBatch(formData)
      .subscribe((response) => {
        this.objBatchFiles = response;
        this.FileList.push(this.objBatchFiles);

      }, function (rejection) {

      })


  }






}
