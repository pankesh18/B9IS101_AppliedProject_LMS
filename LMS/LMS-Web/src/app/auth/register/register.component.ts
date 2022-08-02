import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DoCheck, OnInit } from '@angular/core';
import { LMSUser } from '../auth.models';
import { AuthService } from '../auth.service';
import { RegisterService } from './register.service';
import * as $ from 'jquery';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit, DoCheck {
  page: number = 1;
  lmsUser: LMSUser;

  genderOptions: any[];

  UserTypeOptions: any[];

  isLoginInRegister: boolean = false;

  constructor(private objRegisterService: RegisterService, private authService: SocialAuthService, private messageService: MessageService, private router: Router) {
    this.lmsUser = new LMSUser();
    this.genderOptions = [
      { label: "Male", value: 1 },
      { label: "Female", value: 2 },
      { label: "Others", value: 3 }
    ];

    this.UserTypeOptions = [
      { label: "Teacher", value: 1 },
      { label: "Student", value: 2 }
    ];
  }

  ngDoCheck(): void {
    this.checkwidth()
  }


  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.isLoginInRegister = true
        this.lmsUser.Email = user.email;
        this.lmsUser.FirstName = user.firstName;
        this.lmsUser.LastName = user.lastName;
        this.lmsUser.GoogleUserId = user.id;
        this.lmsUser.ProfilePic = user.photoUrl;
      }
    })

  }



  register() {


    if (this.validate()) {
      this.objRegisterService.registerUser(this.lmsUser)
        .subscribe( (response) => {
          console.log("user created!")
          this.router.navigate(['login'])

        }, function (rejection) {

        })
    }

  }

  checkwidth() {
    $(".p-dropdown").css("width", "100%")
  }


  validate() {

    let msgs = [];
    let valid = true;
    if (this.lmsUser.FirstName == null || this.lmsUser.FirstName == undefined) {
      msgs.push({ severity: 'error', summary: 'Validation Failed', detail: 'First Name is Invalid' })
      valid = false;
    }
    if (this.lmsUser.LastName == null || this.lmsUser.LastName == undefined) {
      msgs.push({ severity: 'error', summary: 'Validation Failed', detail: 'Last Name is Invalid' })
      valid = false;
    }
    if (this.lmsUser.Gender == null || this.lmsUser.Gender == undefined || this.lmsUser.Gender == 0) {
      msgs.push({ severity: 'error', summary: 'Validation Failed', detail: 'Gender is required' })
      valid = false;
    }
    if (this.lmsUser.UserType == null || this.lmsUser.UserType == undefined || this.lmsUser.UserType==0) {
      msgs.push({ severity: 'error', summary: 'Validation Failed', detail: 'User Type is required' })
      valid = false;
    }

    if (valid) {
      return true
    }
    else {
      this.messageService.addAll(msgs);
      return false
    }


  }

}
