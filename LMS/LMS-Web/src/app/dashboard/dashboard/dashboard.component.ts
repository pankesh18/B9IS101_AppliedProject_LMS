import { Component, OnInit } from '@angular/core';
import { LMSUser } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';
import { LoginService } from '../../auth/login/login.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  LoggedInUser: LMSUser

  constructor(private objDashboardService: DashboardService, private objLoginService: LoginService, private auth: AuthService) { }

  ngOnInit(): void {
    this.LoggedInUser = this.auth.getLoggedInUser()

  }
  zoom() {
    this.objDashboardService.ZoomTest()
      .subscribe((response) => {
        console.log(response);

      }, function (rejection) {

      })
  }
}
