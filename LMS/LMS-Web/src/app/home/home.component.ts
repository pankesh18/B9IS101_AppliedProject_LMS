import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
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

  constructor(private authservice: AuthService, private router: Router, private localStorage: LocalStorageService) {


  

  }

  ngOnInit(): void {

    //this.islogin = this.authservice.isLogin()
    //if (this.islogin) {
    //   this.authservice.getUserProfile()
    //  //console.log(this.userProfile.userinfo)
    //}
  }

  goToBatches() {
    this.router.navigate(['/batch/list'])
  }

  goToNotes() {
    this.router.navigate(['/note/list'])
  }


  goToDash() {
    this.router.navigate(['/dash'])
  }

  logout() {
    //this.authservice.logout();
    this.localStorage.remove('LoggedInUser')
    this.router.navigate(['/'])
  }
}
