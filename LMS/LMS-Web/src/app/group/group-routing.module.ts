import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { GroupComponent } from './group/group.component';






const routes: Routes = [
  {
    path: 'group',
    component: HomeComponent,
    children: [
      {
        path: '',
        children: [
          { path: ':BatchId', component: GroupComponent }
        ]
      },

    ]
  },
/*  { path: '**', redirectTo: '' },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
