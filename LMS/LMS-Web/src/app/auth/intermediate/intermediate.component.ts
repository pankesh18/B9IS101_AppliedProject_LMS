import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserProfile } from '../auth.models'
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { WebURL } from '../../appsetting';


@Component({
  selector: 'app-intermediate',
  templateUrl: './intermediate.component.html',
  styleUrls: ['./intermediate.component.css']
})
export class IntermediateComponent implements OnInit {

  islogin: boolean = false;
  userProfile: UserProfile | undefined;

  constructor(private authservice: AuthService, private router: Router, private auth: AuthService) {

  }

  ngOnInit(): void {


    this.auth.isLogin.subscribe(value => this.islogin = value)

    if (this.islogin) {
      console.log('logged in... redirecting to dash')
      this.router.navigate(['/dash'])
    }
    else {
      console.log('trying to login from intermediate!')
     // window.location.href = WebURL+'login'
      this.router.navigate(['/login'])
    }





  }

}
