import { Component, OnInit, Inject, Input } from '@angular/core';
//import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

import { HttpClient } from '@angular/common/http';
import { LMSUser } from '../../auth/auth.models';
import { LoginService } from '../../auth/login/login.service';
import { DOCUMENT } from '@angular/common';
import { ZoomMtg } from '@zoomus/websdk';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';




@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {


  signatureEndpoint: any = 'https://pankesh-zoom.herokuapp.com/'
  sdkKey: any = 'v1cdxwNPuEPBOowiT3In2vhn2kIlo8Q4sgw6'
  @Input() meetingNumber:any
  @Input() role: any = 1
  leaveUrl: any = 'http://localhost:4200'
  userName: any;
  userEmail: any;
  @Input() passWord: any
  @Input() registrantToken: any = ''

  //client = ZoomMtgEmbedded.createClient();
  loggednInUser: LMSUser;

  constructor(private objLoginService: LoginService, private httpClient: HttpClient, @Inject(DOCUMENT) document: any, private router: Router, private route: ActivatedRoute, private auth: AuthService) {
    this.loggednInUser = this.auth.getLoggedInUser();
    this.userName = this.loggednInUser.FirstName.concat(' ', this.loggednInUser.LastName)
    this.userEmail = this.loggednInUser.Email
  
  }

  ngOnInit(): void {
    //ZoomMtg.setZoomJSLib('https://source.zoom.us/2.5.0/lib', '/av');

    //ZoomMtg.preLoadWasm();
    //ZoomMtg.prepareWebSDK();


    //let meetingSDKElement: any | undefined = document.getElementById('meetingSDKElement');




    //this.client.init({
    //  debug: true,
    //  zoomAppRoot: meetingSDKElement,
    //  language: 'en-US',
    //  customize: {
    //    meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
    //    toolbar: {
    //      buttons: [
    //        {
    //          text: 'Custom Button',
    //          className: 'CustomButton',
    //          onClick: () => {
    //            console.log('custom button');
    //          }
    //        }
    //      ]
    //    }
    //  }
    //});

    this.route.params.subscribe((params) => {
      this.meetingNumber = params['meetingNumber']
      this.role = params['role']
      this.passWord = params['passWord']

      //this.getSignature();
    })

   
  }



  //getSignature() {
  //  this.httpClient.post(this.signatureEndpoint, {
  //    role: this.role,
  //    meetingNumber: this.meetingNumber
  //  }).toPromise().then((data: any) => {
  //    if (data.signature) {
  //      console.log(data.signature)
  //     // this.startMeeting(this.sdkKey, data.signature, this.meetingNumber, this.passWord, this.userName, this.userEmail, this.registrantToken)
  //      this.startMeeting(data.signature)

  //    } else {
  //      console.log(data)
  //    }
  //  }).catch((error) => {
  //    console.log(error)
  //  })
  //}



  //startMeeting(sdkKey: any, signature: any, meetingNumber: any, passWord: any, userName: any, userEmail: any, registrantToken:any) {

  //  this.client.join({
  //    sdkKey: sdkKey,
  //    signature: signature,
  //    meetingNumber: meetingNumber,
  //    password: passWord,
  //    userName: userName,
  //    userEmail: userEmail,
  //    tk: registrantToken
  //  })
  //}


  //startMeeting(signature: any) {

  //  document!.getElementById('zmmtg-root')!.style.display = 'block'

  //  ZoomMtg.init({
  //    leaveUrl: this.leaveUrl,
  //    success: (success: any) => {
  //      console.log(success)
  //      ZoomMtg.join({
  //        signature: signature,
  //        meetingNumber: this.meetingNumber,
  //        userName: this.userName,
  //        sdkKey: this.sdkKey,
  //        userEmail: this.userEmail,
  //        passWord: this.passWord,
  //        tk: this.registrantToken,
  //        success: (success: any) => {
  //          console.log(success)
  //        },
  //        error: (error: any) => {
  //          console.log(error)
  //        }
  //      })
  //    },
  //    error: (error: any) => {
  //      console.log(error)
  //    }
  //  })
  //}

}
