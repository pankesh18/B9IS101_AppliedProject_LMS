import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';



const routes: Routes = [


  {
    path: 'zoom',

    children: [
      {
        path: ':MeetingId/:UserId/:Role/:IsGroupMeeting',
        component: AppComponent
      }

    ]
  },
  { path: '', redirectTo: 'zoom', pathMatch: 'full' },
  { path: '**', redirectTo: 'zoom', pathMatch: 'full' },
  //{ path: 'zoom/:MeetingId/:UserId/:Role', component: AppComponent },
  //"http://localhost:4201/zoom?MeetingId=14&Role=1&UserId=1"

];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
