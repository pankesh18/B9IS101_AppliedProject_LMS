import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoomURL } from '../../appsetting';
import { LMSUser } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';
import { LoginService } from '../../auth/login/login.service';
import { Batch, BatchFiles, GroupMeeting, StudentMeeting } from '../../batch/batch.models';
import { BatchService } from '../../batch/batch.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { CoursedetailService } from '../coursedetail.service';

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.css']
})
export class CoursedetailComponent implements OnInit {


  MeetingList: StudentMeeting[] = [];
  FileList: BatchFiles[] = [];
  topicSearchKey: string;
  batchSearchKey: string;
  courseSearchKey: string;
  searchrangeDates: Date[];
  BatchId: number;
  BatchFileId: number;
  isFileNotesView: boolean = false;
  tabIndex: number;
  fileIndex: number = 0;
  objBatch: Batch;
  selectedStudent: LMSUser[] = [];
  LoggedInUser: LMSUser;
  ImageExtension: any[] = ['.jpeg', '.jpg', '.png', '.gif', '.tiff', '.raw', '.bmp']
  meetingTopic: string;
  Tabs: any[] = []
  GroupMeetingList: GroupMeeting[] = [];



  constructor(private objCoursedetailService: CoursedetailService, private router: Router, private route: ActivatedRoute, private objBatchService: BatchService
    , private objLoginService: LoginService, private auth: AuthService) { }

  ngOnInit(): void {
    this.LoggedInUser = this.auth.getLoggedInUser();

    this.route.params.subscribe(params => {
      this.BatchId = params['BatchId']
      this.BatchFileId = params['BatchFileId']
      this.GetBatchDetails(this.BatchId)
      this.GetAllMeetingsByBatchId(this.BatchId)
      this.GetAllFilesByBatchId(this.BatchId)
      this.GetGroupMeetings(this.BatchId, this.LoggedInUser.UserId);
    });

    if (this.BatchFileId != undefined) {
      this.isFileNotesView = true;
      this.tabIndex=1
    }

  }


  GetAllMeetingsByBatchId(BatchId: number) {
    this.objCoursedetailService.GetAllMeetingsByBatchId(BatchId)
      .subscribe((response) => {
        this.MeetingList = response;

      }, function (rejection) {

      })

  }


  GetBatchDetails(BatchId: number) {
    this.objCoursedetailService.GetBatchDetails(BatchId)
      .subscribe((response) => {
        this.objBatch = response
        if (this.objBatch.IsGroupMeetingAllowed) {
          this.Tabs.push({ header: 'Group Meetings' })
        }
        let i = this.objBatch.BatchStudents.findIndex(item => item.UserId == this.LoggedInUser.UserId)
        this.objBatch.BatchStudents.splice(i, 1)

      }, function (rejection) {

      })

  }




  GetAllFilesByBatchId(BatchId: number) {
    this.objCoursedetailService.GetAllFilesByBatchId(BatchId)
      .subscribe((response) => {

        if (response != null) {
          this.FileList = response;
          this.FileList.forEach(item => { item.FileType = this.ImageExtension.includes(item.FileExtension) ? 'image' : 'document' })

          if (this.isFileNotesView) {
            this.fileIndex = this.FileList.findIndex(item => item.BatchFileId == this.BatchFileId)
            this.FileList.forEach(item => {
              if (item.BatchFileId == this.BatchFileId) {
                item.IsNoteList = true;
              }
            })
          }

        }





      }, function (rejection) {

      })

  }



  getYoutubeVideoId(URL: any) {

    var ID: any;
    URL = URL.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (URL[2] !== undefined) {
      ID = URL[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    }
    else {
      ID = URL;
    }
    return ID;

  }

  searchByMeetingTopic() {

    if (this.topicSearchKey == '' && this.batchSearchKey == '' && this.courseSearchKey == '') {
      this.GetAllMeetingsByBatchId(this.BatchId)
    }
    else {


      var filteredlist = this.MeetingList.filter(item => {
        return item.Topic.includes(this.topicSearchKey);
      })

      this.MeetingList = filteredlist;

    }
  }

  searchByBatchName() {

    if (this.topicSearchKey == '' && this.batchSearchKey == '' && this.courseSearchKey == '') {
      this.GetAllMeetingsByBatchId(this.BatchId)
    }
    else {


      var filteredlist = this.MeetingList.filter(item => {
        let batch = item.BatchName.concat('-', item.BatchYear);

        return batch.includes(this.batchSearchKey);
      })

      this.MeetingList = filteredlist;

    }
  }


  searchByCourseName() {

    if (this.topicSearchKey == '' && this.batchSearchKey == '' && this.courseSearchKey == '') {
      this.GetAllMeetingsByBatchId(this.BatchId)
    }
    else {


      var filteredlist = this.MeetingList.filter(item => {

        return item.CourseName.includes(this.courseSearchKey);
      })

      this.MeetingList = filteredlist;

    }
  }



  searchByDateRange() {

    if (this.topicSearchKey == '' && this.batchSearchKey == '' && this.courseSearchKey == '' && this.searchrangeDates.length == 0) {
      this.GetAllMeetingsByBatchId(this.BatchId)
    }
    else {

      if (this.searchrangeDates[0] != null && this.searchrangeDates[1] != null) {

        let start = this.searchrangeDates[0];
        let end = this.searchrangeDates[1];
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);


        var filteredlist = this.MeetingList.filter(item => {

          let starttime = new Date(item.StartTime);
          return start <= starttime && starttime <= end
        })

        this.MeetingList = filteredlist;


      }



    }
  }



  StartGroupMeeting() {
    let studentMeeting = new GroupMeeting()
    studentMeeting.BatchId = this.BatchId;
    studentMeeting.HostEmail = this.LoggedInUser.Email
    studentMeeting.Topic = this.meetingTopic
    studentMeeting.GroupMeetingStudents = this.selectedStudent
    studentMeeting.GroupMeetingStudents.push(this.LoggedInUser)
    studentMeeting.CreatedBy = this.LoggedInUser.UserId;
    this.objCoursedetailService.StartGroupMeeting(studentMeeting)
      .subscribe((response) => {

        this.startZoom(response, true)
        
        this.GetGroupMeetings(this.BatchId, this.LoggedInUser.UserId);

      }, function (rejection) {

      })

  }



  GetGroupMeetings(BatchId: number, UserId: number) {
    this.objCoursedetailService.GetGroupMeetings(BatchId, UserId)
      .subscribe((response) => {

        if (response != null) {
          this.GroupMeetingList = response
          this.GroupMeetingList.forEach(meet => {
            meet.StudentListString = this.getStudentListString(meet.GroupMeetingStudents)
          })
        }


      }, function (rejection) {

      })

  }


  getStudentListString(Students: LMSUser[]) {
    let value = "";

    Students.forEach((stud, i) => {
      if (i < Students.length-1) {
        value = value + stud.FirstName + ", "
      }
      else if (i == Students.length-1) {
        value = value + stud.FirstName
      }

    })

    if (value.length > 20) {
      value = value.substring(0,5) + "..."
    }


    return value;
  }



  startZoom(Meeting: any, isGroupMeeting: boolean = false) {
    let role = Meeting.CreatedBy == this.LoggedInUser.UserId ? 1 : 0;

    if (isGroupMeeting) {
      let url = ZoomURL+'zoom?' + 'MeetingId=' + Meeting.GroupMeetingId + '&Role=' + role + '&UserId=' + this.LoggedInUser.UserId + '&IsGroupMeeting=true'
      window.open(url, '_blank');
    }
    else {
      let url = ZoomURL+'zoom?' + 'MeetingId=' + Meeting.BatchMeetingId + '&Role=' + role + '&UserId=' + this.LoggedInUser.UserId + '&IsGroupMeeting=false'
      window.open(url, '_blank');
    }
    

  }

}
