import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CreateNotesComponent } from './create-notes/create-notes.component';
import { NotesListComponent } from './notes-list/notes-list.component';


const routes: Routes = [
  {
    path: 'note',
    component: HomeComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'createnote', component: CreateNotesComponent },
          { path: 'list', component: NotesListComponent }
        ]
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
