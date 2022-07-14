import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserProfile } from '../auth.models'
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-intermediate',
  templateUrl: './intermediate.component.html',
  styleUrls: ['./intermediate.component.css']
})
export class IntermediateComponent implements OnInit {

  islogin: boolean = false;
  userProfile: UserProfile | undefined;

  constructor(private authservice: AuthService, private router: Router, private loginService: LoginService) {

  }

  ngOnInit(): void {
    //this.islogin = this.authservice.isLogin()
    //if (this.islogin) {
    //  //this.userProfile = this.authservice.getUserProfile()
    //}

    this.islogin = this.loginService.isLogin()

    if (this.islogin) {
      console.log('logged in... redirecting to dash')
      this.router.navigate(['/dash'])
    }
    else {
      console.log('trying to login from intermediate!')
      this.router.navigate(['/login'])
    }





  }

}
