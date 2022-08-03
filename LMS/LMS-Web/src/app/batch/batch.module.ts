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
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectButtonModule } from 'primeng/selectbutton';

import { CheckboxModule } from 'primeng/checkbox';


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
    ToggleButtonModule,
    PickListModule,
 
    DialogModule,
    TableModule,
    ButtonModule,
    FormsModule,
    CheckboxModule,
    StepsModule,
    FileUploadModule,
    OrderListModule,
    SelectButtonModule,
    CalendarModule,
    BatchRoutingModule
  ],
  providers: [
    DialogService
  ]
})
export class BatchModule { }
