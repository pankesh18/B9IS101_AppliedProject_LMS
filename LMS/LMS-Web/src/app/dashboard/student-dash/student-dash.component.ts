import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LMSUser } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';
import { LoginService } from '../../auth/login/login.service';
import { Batch, GroupMeeting } from '../../batch/batch.models';
import { CoursedetailService } from '../../coursedetail/coursedetail.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrls: ['./student-dash.component.css']
})
export class StudentDashComponent implements OnInit {

  StudentBatches: Batch[] = [];
  loggednInUser: LMSUser;
  GroupMeetings: GroupMeeting[] = [];
  constructor(private objLoginService: LoginService, private objDashboardService: DashboardService, private router: Router
    , private objCourseService: CoursedetailService, private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loggednInUser = this.auth.getLoggedInUser();
    this.GetAllBatches(this.loggednInUser.UserId)
    this.GetGroupMeetings(this.loggednInUser.UserId)
  }


  GetAllBatches(UserId: number) {
    this.objDashboardService.GetAllStudentBatches(UserId)
      .subscribe((response) => {
        this.StudentBatches = response;

      }, function (rejection) {

      })
  }

  GetGroupMeetings(UserId: number) {
    this.objCourseService.GetGroupMeetings(0, UserId)
      .subscribe((response) => {
        this.GroupMeetings = response;

      }, function (rejection) {

      })
  }


  zoom() {
    this.objDashboardService.ZoomTest()
      .subscribe((response) => {
        console.log(response);

      }, function (rejection) {

      })
  }


  goToCourseDetail(BatchId: number) {
    this.router.navigate(['/coursedetail', BatchId])
  }


}
