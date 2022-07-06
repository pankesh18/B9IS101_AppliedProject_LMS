import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../auth/auth.models';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  visibleSidebar1: any;


  islogin: boolean = false;
  userProfile: UserProfile | undefined;

  constructor(private authservice: AuthService) {


  

  }

  ngOnInit(): void {

    //this.islogin = this.authservice.isLogin()
    //if (this.islogin) {
    //   this.authservice.getUserProfile()
    //  //console.log(this.userProfile.userinfo)
    //}
  }



  logout() {
    this.authservice.logout();
  }
}
