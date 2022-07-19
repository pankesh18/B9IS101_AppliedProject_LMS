import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LMSUser } from '../../auth/auth.models';
import { LoginService } from '../../auth/login/login.service';
import { Batch } from '../../batch/batch.models';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrls: ['./student-dash.component.css']
})
export class StudentDashComponent implements OnInit {

  StudentBatches: Batch[] = [];
  loggednInUser: LMSUser;
  constructor(private objLoginService: LoginService, private objDashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.loggednInUser = this.objLoginService.getLoggedInUser();
    this.GetAllBatches(this.loggednInUser.UserId)

  }


  GetAllBatches(UserId: number) {
    this.objDashboardService.GetAllStudentBatches(UserId)
      .subscribe((response) => {
        this.StudentBatches = response;

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
