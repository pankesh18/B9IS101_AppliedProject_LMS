import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchFiles, StudentMeeting } from '../../batch/batch.models';
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

  constructor(private objCoursedetailService: CoursedetailService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.BatchId = params['BatchId']
      this.GetAllMeetingsByBatchId(this.BatchId)
      this.GetAllFilesByBatchId(this.BatchId)
    });
  }


  GetAllMeetingsByBatchId(BatchId: number) {
    this.objCoursedetailService.GetAllMeetingsByBatchId(BatchId)
      .subscribe((response) => {
        this.MeetingList = response;


      }, function (rejection) {

      })

  }

  GetAllFilesByBatchId(BatchId: number) {
    this.objCoursedetailService.GetAllFilesByBatchId(BatchId)
      .subscribe((response) => {
        this.FileList = response;


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
}
