import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CoursedetailComponent } from './coursedetail/coursedetail.component';








const routes: Routes = [
  {
    path: 'coursedetail',
    component: HomeComponent,
    children: [
      {
        path: '',
        children: [
          { path: ':BatchId', component: CoursedetailComponent },
        ]
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CourseDetailRoutingModule { }
