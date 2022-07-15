import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchComponent } from './batch/batch.component';
import { BatchRoutingModule } from './batch-routing.module';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CreateBatchComponent } from './batch/create-batch.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { PickListModule } from 'primeng/picklist';
import { TableModule } from 'primeng/table';
import { StepsModule } from 'primeng/steps';
import { AddMeetingComponent } from './batch/add-meeting.component';
import { OrderListModule } from 'primeng/orderlist';
import { AddFilesComponent } from './batch/add-files.component';
import { FileUploadModule } from 'primeng/fileupload';



@NgModule({
  declarations: [
    BatchComponent,
    CreateBatchComponent,
    AddFilesComponent,
    AddMeetingComponent
  ],
  imports: [
    CommonModule,
    DynamicDialogModule,
    InputTextModule,
    PickListModule,
    TableModule,
    ButtonModule,
    FormsModule,
    StepsModule,
    FileUploadModule,
    OrderListModule,
    CalendarModule,
    BatchRoutingModule
  ],
  providers: [
    DialogService
  ]
})
export class BatchModule { }
