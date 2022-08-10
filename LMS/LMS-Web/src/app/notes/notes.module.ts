import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesListComponent } from './notes-list/notes-list.component';
import { CreateNotesComponent } from './create-notes/create-notes.component';
import { EditorModule } from 'primeng/editor';
import { NotesRoutingModule } from './notes-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ViewnoteComponent } from './viewnote/viewnote.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';


@NgModule({
  declarations: [
    NotesListComponent,
    CreateNotesComponent,
    ViewnoteComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,

    ListboxModule,
    TableModule,
    OverlayPanelModule,
    InputTextModule,
    NotesRoutingModule

  ],
  exports: [CreateNotesComponent, NotesListComponent]
})
export class NotesModule { }
