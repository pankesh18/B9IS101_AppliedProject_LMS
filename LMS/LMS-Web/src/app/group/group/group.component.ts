import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LMSUser } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';
import { Batch } from '../../batch/batch.models';
import { GroupService } from '../group.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [MessageService]
})
export class GroupComponent implements OnInit, DoCheck {

  BatchStudents: LMSUser[] = [];
  Students: any[] = [];
  selectedStudents: any[] = [];
  BatchId: number;
  selectionLimit: number=2;
  constructor(private auth: AuthService, private messageService: MessageService, private objGroupService: GroupService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.BatchId = params['BatchId']
      this.GetAllStudentsInBatch(this.BatchId)
    })

  }

  ngDoCheck(): void {
    this.setWidth()
  }

  GetAllStudentsInBatch(BatchId: number) {

    this.objGroupService.GetAllStudentsInBatch(BatchId)
      .subscribe((response) => {

        if (response != null) {
          this.BatchStudents = response;
          this.BatchStudents.forEach(item => {
            this.Students.push({ name: item.FirstName + " " + item.LastName, value: item.UserId, pic: item.ProfilePic })
          })
        }


      }, function (rejection) {

      })

  }

  setWidth() {
      $(".p-multiselect").css("width", "100%")
  }

}
