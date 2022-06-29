import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';





const routes: Routes = [
  {
    path: 'dash',
    component: HomeComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', component: DashboardComponent }
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
export class DashboardRoutingModule { }
