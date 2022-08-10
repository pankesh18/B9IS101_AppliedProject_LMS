import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { IntermediateComponent } from './auth/intermediate/intermediate.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { HomeComponent } from './home/home.component';
import { ZoomComponent } from './zoom/zoom/zoom.component';




const routes: Routes = [
  //{ path: '', component: DashboardComponent },
  { path: '', component: IntermediateComponent },
  { path: 'intermediate', component: IntermediateComponent },
  //{ path: 'zoom/:meetingNumber/:role/:passWord', component: ZoomComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
