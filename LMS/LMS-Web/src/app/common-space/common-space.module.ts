import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSpaceComponent } from './common-space/common-space.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { CommonSpaceRoutingModule } from './common-space-routing.module';
import { TreeTableModule } from 'primeng/treetable';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxDocViewerModule } from 'ngx-doc-viewer2';
import { NotesModule } from '../notes/notes.module';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    CommonSpaceComponent
  ],
  imports: [
    CommonModule,
    MultiSelectModule,
    FormsModule,
    BrowserModule,
    OverlayPanelModule,
    DialogModule,
    FileUploadModule,
    NotesModule,
    ToastModule,
    ButtonModule,
    NgxDocViewerModule,
    BrowserAnimationsModule,
    TableModule,
    TreeTableModule,
    CommonSpaceRoutingModule
  ]
})
export class CommonSpaceModule { }
