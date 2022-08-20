import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from './app.service';
import { GroupMeeting, LMSUser, StudentMeeting } from './app.models';


ZoomMtg.setZoomJSLib('https://source.zoom.us/2.5.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  signatureEndpoint = 'https://pankesh-zoom.herokuapp.com/'
  sdkKey = 'v1cdxwNPuEPBOowiT3In2vhn2kIlo8Q4sgw6'
  meetingNumber:any
  role = 0
  leaveUrl = 'http://localhost:4200'
  userName:any
  userEmail: any
  passWord: any
  registrantToken: any



  MeetingId: number
  UserId: number
  LoggedInUser: LMSUser
  StudentMeeting: StudentMeeting
  GroupMeeting: GroupMeeting
  IsGroupMeeting: boolean = false;

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document, private route: ActivatedRoute, private objAppService: AppService) {

  }

  ngOnInit() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.MeetingId = parseInt( urlParams.get('MeetingId'))
    this.UserId = parseInt(urlParams.get('UserId'))
    this.role = parseInt(urlParams.get('Role'))
    this.IsGroupMeeting = Boolean(urlParams.get('IsGroupMeeting'))
    this.GetUserDetails(this.UserId);
 
    //this.route.params.subscribe((params) => {
    //  this.MeetingId = params["MeetingId"]
    //  this.UserId = params['UserId']

    //})
  }

  getSignature() {
    this.httpClient.post(this.signatureEndpoint, {
	    meetingNumber: this.meetingNumber,
	    role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      success: (success) => {
        console.log(success)
        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          sdkKey: this.sdkKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          tk: this.registrantToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  GetUserDetails(UserId: number) {
    this.objAppService.GetUserDetails(UserId)
      .subscribe((response) => {
        this.LoggedInUser = response

        this.userName = this.LoggedInUser.FirstName.concat(" ", this.LoggedInUser.LastName)
        this.userEmail = this.LoggedInUser.Email

        if (!this.IsGroupMeeting) {
          this.GetBatchMeetingDetails(this.MeetingId)
        }
        else {
          this.GetGroupMeetingDetails(this.MeetingId)
        }

      }, function (rejection) {

      })
  }


  GetBatchMeetingDetails(BatchMeetingId: number) {
    this.objAppService.GetBatchMeetingDetails(BatchMeetingId)
      .subscribe((response) => {
        this.StudentMeeting = response;
        this.meetingNumber = this.StudentMeeting.ZoomMeetingId;
        this.passWord = this.StudentMeeting.Password;
      }, function (rejection) {

      })
  }

  GetGroupMeetingDetails(GroupMeetingId: number) {
    this.objAppService.GetGroupMeetingDetails(GroupMeetingId)
      .subscribe((response) => {
        this.GroupMeeting = response;
        this.meetingNumber = this.GroupMeeting.ZoomMeetingId;
        this.passWord = this.GroupMeeting.Password;
      }, function (rejection) {

      })
  }


}
