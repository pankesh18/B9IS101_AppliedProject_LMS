import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CommonSpaceComponent } from './common-space/common-space.component';






const routes: Routes = [
  {
    path: 'commonspace',
    component: HomeComponent,
    children: [
      {
        path: '',
        children: [
          { path: ':BatchId', component: CommonSpaceComponent }
        ]
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CommonSpaceRoutingModule { }
