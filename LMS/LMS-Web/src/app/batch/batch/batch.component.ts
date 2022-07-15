import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Batch } from '../batch.models';
import { BatchService } from '../batch.service';
import { CreateBatchComponent } from './create-batch.component';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {
  ref: DynamicDialogRef
  Batches: Batch[] = [];
  constructor(private dialogService: DialogService, private objBatchService: BatchService ) { }

  ngOnInit(): void {
    this.GetAllBatches()
  }




  showCreateBatch() {
    this.ref = this.dialogService.open(CreateBatchComponent, {
      header: 'Create Batch',
      width: '70%',
      height: '85%',
      contentStyle: {  "overflow": "auto" },
      baseZIndex: 10000
    });


  }

  GetAllBatches() {


    this.objBatchService.GetAllBatches()
      .subscribe((response) => {
        this.Batches = response;
        console.log(this.Batches)

      }, function (rejection) {

      })
  }


}
