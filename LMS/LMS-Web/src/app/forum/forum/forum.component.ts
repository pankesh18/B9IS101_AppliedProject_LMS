import { Component, OnInit } from '@angular/core';
import { LMSUser } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';
import { Batch } from '../../batch/batch.models';
import { ForumComment, ForumQuestion } from '../forum.models';
import { ForumService } from '../forum.service';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [MessageService]

})
export class ForumComponent implements OnInit {

  StudentBatches: Batch[];
  BatchOptions: any[]=[];
  FilterBatchOptions: any[]=[];
  BatchId: number = 0;
  FilterBatchId: number = 0;
  QuestionBody: any;
  objForumQuestion: ForumQuestion[] = [];
  LoggedInUser: LMSUser

  forum: any[] = [
    {
      forumbody: "Body 1?", Date: new Date().toLocaleDateString(), Createdby: "Author 1", CreatedPhoto: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      Replies: [{ forumbody: "Body 2?", Date: new Date().toLocaleDateString(), Createdby: "Author 2", CreatedPhoto: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" }
        , { forumbody: "Body 3?", Date: new Date().toLocaleDateString(), Createdby: "Author 3", CreatedPhoto: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" }
      ]
    }, { forumbody: "Body 4?", Date: new Date().toLocaleDateString(), Createdby: "Author 4", CreatedPhoto: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg", Replies:[] }
    
  ]


  constructor(private objForumService: ForumService, private auth: AuthService, private messageService: MessageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.LoggedInUser = this.auth.getLoggedInUser()
    if (this.LoggedInUser.UserType == 1) {
      this.GetAllBatches(this.LoggedInUser.UserId)
    }
    else {
      this.GetAllStudentBatches(this.LoggedInUser.UserId)

    }
    this.GetAllDiscussionForum(this.BatchId);
  }
        



  GetAllStudentBatches(UserId: number) {
    this.BatchOptions = [];
    this.FilterBatchOptions = [{ name : 'All Batches', value:0}];
    this.objForumService.GetAllStudentBatches(UserId)
      .subscribe((response) => {
        if (response != null) {
          this.StudentBatches = response;
          this.StudentBatches.forEach(item => {
            let batch = { name: item.BatchName.concat('-', new Date(item.BatchYear).getFullYear().toString()), value: item.BatchId }
            this.BatchOptions.push(batch);
            this.FilterBatchOptions.push(batch);
          })
          console.log(response)

        }


      }, function (rejection) {

      })
  }





  GetAllBatches(UserId: number) {
    this.BatchOptions = [];
    this.FilterBatchOptions = [{ name: 'All Batches', value: 0 }];
    this.objForumService.GetAllBatches(UserId)
      .subscribe((response) => {
        if (response != null) {
          this.StudentBatches = response;
          this.StudentBatches.forEach(item => {
            let batch = { name: item.BatchName.concat('-', new Date(item.BatchYear).getFullYear().toString()), value: item.BatchId }
            this.BatchOptions.push(batch);
            this.FilterBatchOptions.push(batch);
          })
          console.log(response)

        }


      }, function (rejection) {

      })
  }






  sanitizeHTML(HtmlText: any) {
    return this.sanitizer.bypassSecurityTrustHtml(HtmlText)
  }







  GetAllDiscussionForum(BatchId: number) {
    if (BatchId == null || BatchId == undefined) {
      BatchId = 0;
    }

    this.objForumService.GetAllDiscussionForum(BatchId, this.LoggedInUser.UserId)
      .subscribe((response) => {

        if (response.length > 0) {
          this.objForumQuestion = response;
          this.objForumQuestion.forEach((question, index) => {

            var testImg = new Image();
            var _me = this;
            testImg.addEventListener('error', () => {
              console.log("Error in image")
              question.CreatedBy.ProfilePic = "../../../assets/ProfilePic.jpg";
            });

            testImg.src = question.CreatedBy.ProfilePic;
          })


        } else {
          this.objForumQuestion = [];
        }


     

      }, function (rejection) {

      })
  }


  

  PostForumQuestion() {
    if (this.BatchId == 0 || this.BatchId == null || this.BatchId== undefined) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Select Batch' })
      return
    }
    let objForumQuestion = new ForumQuestion()

    objForumQuestion.BatchId = this.BatchId
    objForumQuestion.QuestionBody = this.QuestionBody
    objForumQuestion.CreatedBy = this.LoggedInUser

    this.objForumService.PostForumQuestion(objForumQuestion)
      .subscribe((response) => {
        this.messageService.add({ severity: 'success', summary: 'Done!', detail: 'Question Posted' })
        this.GetAllDiscussionForum(this.BatchId);

      }, function (rejection) {

      })
  }



  DeleteForumQuestion(objForumQuestion: ForumQuestion) {


    this.objForumService.DeleteForumQuestion(objForumQuestion)
      .subscribe((response) => {
        this.messageService.add({ severity: 'success', summary: 'Done!', detail: 'Question Deleted' })


        this.GetAllDiscussionForum(this.BatchId);

      }, function (rejection) {

      })
  }


  PostForumComment(CommentBody: any, ForumQuestionId: number, BatchId: number) {

    let objForumComment = new ForumComment()
    objForumComment.ForumQuestionId = ForumQuestionId
    objForumComment.BatchId = BatchId
    objForumComment.CommentBody = CommentBody
    objForumComment.CreatedBy = this.LoggedInUser

    this.objForumService.PostForumComment(objForumComment)
      .subscribe((response) => {
        this.messageService.add({ severity: 'success', summary: 'Done!', detail: 'Comment Posted' })


        this.GetAllDiscussionForum(this.BatchId);

      }, function (rejection) {

      })
  }


  DeleteForumComment(objForumComment: ForumComment) {


    this.objForumService.DeleteForumComment(objForumComment)
      .subscribe((response) => {
        this.messageService.add({ severity: 'success', summary: 'Done!', detail: 'Comment Deleted' })


        this.GetAllDiscussionForum(this.BatchId);

      }, function (rejection) {

      })
  }


  testImg(url: any, index:any) {
    var testImg = new Image();
    var _me = this;
    testImg.addEventListener('load', () => {
      console.log("Image load successfully")
      return url;
    });
    testImg.addEventListener('error', () => {
      console.log("Error in image")
      return "../../../assets/ProfilePic.jpg";
    });

    testImg.src = url;
  }

}
