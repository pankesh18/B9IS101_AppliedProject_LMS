import { Component, OnInit } from '@angular/core';
import { LMSUser } from '../../auth/auth.models';
import { LoginService } from '../../auth/login/login.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

  constructor(private objLoginService: LoginService, private objDashboardService: DashboardService) {
    this.LoggedInUser = this.objLoginService.getLoggedInUser();

  }
  StudentMeetings: any[] = [];
  LoggedInUser: LMSUser;
  ngOnInit(): void {

    this.GetAllStudentMetings(this.LoggedInUser.UserId);
  }


  GetAllStudentMetings(UserId: number) {
    this.objDashboardService.GetAllStudentMetings(UserId)
      .subscribe((response) => {
        this.StudentMeetings = response;

      }, function (rejection) {

      })
  }



}
