import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { IntermediateComponent } from './auth/intermediate/intermediate.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';




const routes: Routes = [
  //{ path: '', component: DashboardComponent },
  { path: '', component: IntermediateComponent },
  { path: 'intermediate', component: IntermediateComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
