import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private objDashboardService: DashboardService) { }

  ngOnInit(): void {
  }
  zoom() {
    this.objDashboardService.ZoomTest()
      .subscribe((response) => {
        console.log(response);

      }, function (rejection) {

      })
  }
}
