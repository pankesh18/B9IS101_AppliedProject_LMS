import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LMSUser } from '../../auth/auth.models';
import { LoginService } from '../../auth/login/login.service';
import { StudentMeeting } from '../../batch/batch.models';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

  constructor(private objLoginService: LoginService, private objDashboardService: DashboardService, private router: Router) {
    this.LoggedInUser = this.objLoginService.getLoggedInUser();

  }
  StudentMeetings: StudentMeeting[] = [];
  LoggedInUser: LMSUser;

  topicSearchKey: string;
  batchSearchKey: string;
  courseSearchKey: string;
  ojStudentMeetings: StudentMeeting[] = [];
  searchrangeDates: Date[];
  MeetingId: number;

  ngOnInit(): void {

    if (this.LoggedInUser.UserType == 1) {
      this.GetAllTeacherMetings(this.LoggedInUser.UserId);
    }
    else {
      this.GetAllStudentMetings(this.LoggedInUser.UserId);

    }
  }


  GetAllStudentMetings(UserId: number) {
    this.objDashboardService.GetAllStudentMetings(UserId)
      .subscribe((response) => {
        this.StudentMeetings = response;
        this.ojStudentMeetings = this.StudentMeetings
      }, function (rejection) {

      })
  }


  GetAllTeacherMetings(UserId: number) {
    this.objDashboardService.GetAllTeacherMetings(UserId)
      .subscribe((response) => {
        this.StudentMeetings = response;
        this.ojStudentMeetings = this.StudentMeetings
      }, function (rejection) {

      })
  }



  searchByMeetingTopic() {

    if (this.topicSearchKey == '' && this.batchSearchKey == '' && this.courseSearchKey == '') {
      this.StudentMeetings = this.ojStudentMeetings;
      }
      else {
      

      var filteredlist = this.StudentMeetings.filter(item => {
          return item.Topic.includes(this.topicSearchKey);
        })

        this.StudentMeetings = filteredlist;

      }
  }

  searchByBatchName() {

    if (this.topicSearchKey == '' && this.batchSearchKey == '' && this.courseSearchKey == '') {
      this.StudentMeetings = this.ojStudentMeetings;
    }
    else {


      var filteredlist = this.StudentMeetings.filter(item => {
        let batch = item.BatchName.concat('-', item.BatchYear);

        return batch.includes(this.batchSearchKey);
      })

      this.StudentMeetings = filteredlist;

    }
  }


  searchByCourseName() {

    if (this.topicSearchKey == '' && this.batchSearchKey == '' && this.courseSearchKey == ''  ) {
      this.StudentMeetings = this.ojStudentMeetings;
    }
    else {

      
      var filteredlist = this.StudentMeetings.filter(item => {

        return item.CourseName.includes(this.courseSearchKey);
      })

      this.StudentMeetings = filteredlist;

    }
  }



  searchByDateRange() {

    if (this.topicSearchKey == '' && this.batchSearchKey == '' && this.courseSearchKey == '' && this.searchrangeDates.length==0) {
      this.StudentMeetings = this.ojStudentMeetings;
    }
    else {

      if (this.searchrangeDates[0] != null && this.searchrangeDates[1] != null) {

        let start = this.searchrangeDates[0];
        let end = this.searchrangeDates[1];
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);


        var filteredlist = this.StudentMeetings.filter(item => {

          let starttime = new Date(item.StartTime);
          return start <= starttime && starttime <= end 
        })

       this.StudentMeetings = filteredlist;


      }




      //var filteredlist = this.ojStudentMeetings.filter(item => {

      //  return item.CourseName.includes(this.courseSearchKey);
      //})


    }
  }


  startZoom(Meeting: any) {

    let role = Meeting.CreatedBy == this.LoggedInUser.UserId ? 1 : 0;
    var url = 'http://localhost:4201/zoom?' + 'MeetingId=' + Meeting.BatchMeetingId + '&Role=' + role + '&UserId=' + this.LoggedInUser.UserId
    window.open(url, '_blank');

  }

}
