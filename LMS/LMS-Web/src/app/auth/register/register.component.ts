import { Component, OnInit } from '@angular/core';
import { LMSUser } from '../auth.models';
import { AuthService } from '../auth.service';
import { RegisterService } from './register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  page: number = 1;
  lmsUser: LMSUser;

  genderOptions: any[];

  UserTypeOptions: any[];



  constructor(private objRegisterService: RegisterService) {
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

  ngOnInit(): void {
  }



  register() {

    this.objRegisterService.registerUser(this.lmsUser)
      .subscribe(function (response) {
        console.log("user created!")

      }, function (rejection) {

      })
  }


}
