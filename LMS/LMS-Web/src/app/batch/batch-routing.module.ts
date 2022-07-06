import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BatchComponent } from './batch/batch.component';







const routes: Routes = [
  {
    path: 'batch',
    component: HomeComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'list', component: BatchComponent }
        ]
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule { }
