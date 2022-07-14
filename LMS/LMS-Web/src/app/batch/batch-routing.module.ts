import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AddMeetingComponent } from './batch/add-meeting.component';
import { BatchComponent } from './batch/batch.component';







const routes: Routes = [
  {
    path: 'batch',
    component: HomeComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'list', component: BatchComponent },
          { path: 'meetings/:BatchId', component: AddMeetingComponent }
        ]
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule { }
