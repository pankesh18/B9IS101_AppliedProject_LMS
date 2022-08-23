import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LMSUser } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';
import { CommonSpaceService } from '../common-space.service';
import * as $ from 'jquery';
import { TreeNode } from 'primeng/api';
import { CommonSpaceFile, CommonSpaceGroup } from '../common-space.models';
import { BatchNote } from '../../notes/note.models';



@Component({
  selector: 'app-common-space',
  templateUrl: './common-space.component.html',
  styleUrls: ['./common-space.component.css'],
  providers: [MessageService]
})
export class CommonSpaceComponent implements OnInit {
  loggedInUser: LMSUser
  BatchStudents: LMSUser[] = [];
  Students: any[] = [];
  selectedStudents: any[] = [];
  BatchId: number;
  selectionLimit: number = 2;
  GroupName: string;
  objCommonSpaceGroup: CommonSpaceGroup = new CommonSpaceGroup()
  fileNodes: TreeNode[] = [];
  ListGroups: CommonSpaceGroup[] = [];
  SpaceNodes: TreeNode<CommonSpaceGroup>[] = []
  displayFileUpload: boolean = false;
  displayAddNote: boolean = false;
  displayFileViewer: boolean = false;
  FileName: string
  FileCommonSpaceGroup: CommonSpaceGroup = new CommonSpaceGroup()
  FileView: CommonSpaceFile
  Files: any[] = [];
  BatchNoteList: BatchNote[] = [];
  Viewnote: BatchNote;
  ImageExtension: any[] = ['.jpeg', '.jpg', '.png', '.gif', '.tiff', '.raw', '.bmp']

  cols:any[] = [
    { field: 'name', header: 'Name' },
    { field: 'type', header: 'Type' },
    { field: 'action', header: 'Action' },
    { field: 'student', header: 'No. Of Students'}
  ];

  constructor(private auth: AuthService, private messageService: MessageService, private objCommonSpaceService: CommonSpaceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loggedInUser = this.auth.getLoggedInUser()

    this.route.params.subscribe(params => {
      this.BatchId = params['BatchId']
      this.GetAllStudentsInBatch(this.BatchId)
      this.GetCommonSpaceGroup(this.BatchId)
    })

    this.fileNodes=this.objCommonSpaceService.getFilesystem()
  }

  ngDoCheck(): void {
    this.setWidth()
  }

  selectStudent() {
    this.objCommonSpaceGroup.CommonSpaceGroupStudent = [];
    this.selectedStudents.forEach(item => {

      this.BatchStudents.forEach(stud => {

        if (stud.UserId == item.value) {
          this.objCommonSpaceGroup.CommonSpaceGroupStudent.push(stud)
        }

      })


    })

  }

  isImage(extenstion: string) {
    if (this.ImageExtension.includes(extenstion.toLowerCase())) {
      return true
    }
    else {
      return false
    }
  }

  GetAllStudentsInBatch(BatchId: number) {

    this.objCommonSpaceService.GetAllStudentsInBatch(BatchId)
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





  GetBatchNotes(BatchId: number, UserId: number) {

    this.objCommonSpaceService.GetBatchNotes(BatchId, UserId, 0,0)
      .subscribe((response) => {

        if (response != null) {
          this.BatchNoteList = response;
        }


      }, function (rejection) {

      })

  }




  CreateCommonSpace(objCommonSpaceGroup: CommonSpaceGroup) {
    objCommonSpaceGroup.BatchId = this.BatchId;

    this.objCommonSpaceService.CreateCommonSpace(objCommonSpaceGroup)
      .subscribe((response) => {
        if (response != null) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: " Space Created successfully" });

          this.objCommonSpaceGroup = new CommonSpaceGroup();
          this.GetCommonSpaceGroup(this.BatchId)

        }

      }, function (rejection) {

      })

  }


  AddFiles(event: any) {
    console.log(event)
    this.Files = [];
    this.Files.push(event.files[0])
  }



  AddCommonSpaceFile(objCommonSpaceGroup: CommonSpaceGroup) {
    let objFormData = new FormData()

    objFormData.append("File", this.Files[0])

    let objFile = new CommonSpaceFile()

    objFile.FileName = this.FileName
    objFile.ContentType = 1
    objFile.BatchId = this.BatchId
    objFile.CommonSpaceGroupId = objCommonSpaceGroup.CommonSpaceGroupId

    let ext = this.Files[0].name.substring(this.Files[0].name.lastIndexOf('.'), this.Files[0].name.length);

    objFile.FileExtension = ext
    objFile.FolderName = objCommonSpaceGroup.GroupName
    objFile.FileSize = (this.Files[0].size / (1024 * 1024))
    objFile.CreatedBy = this.loggedInUser.UserId



    let fileObject = {
      FileName: this.FileName
      ,ContentType: 1
      , BatchId : this.BatchId
      , CommonSpaceGroupId: objCommonSpaceGroup.CommonSpaceGroupId
      , FileExtension: ext
      , FolderName: objCommonSpaceGroup.GroupName
      , FileSize: (this.Files[0].size / (1024 * 1024))
      , CreatedBy: this.loggedInUser.UserId
    }

    objFormData.append("CommonSpaceFile", JSON.stringify(fileObject))


    //objFormData.append("FileName", this.FileName)
    //objFormData.append("ContentType", "1")
    //objFormData.append("BatchId", JSON.stringify(this.BatchId))
    //objFormData.append("CommonSpaceGroupId", JSON.stringify(objCommonSpaceGroup.CommonSpaceGroupId))

    //objFormData.append("FileExtension", ext)
    //objFormData.append("FolderName", objCommonSpaceGroup.GroupName)
    //objFormData.append("FileSize", JSON.stringify(this.Files[0].size / (1024 * 1024)))
    //objFormData.append("CreatedBy", JSON.stringify(this.loggedInUser.UserId))



    this.objCommonSpaceService.AddCommonSpaceFile(objFormData)
      .subscribe((response) => {
        if (response != null) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "File Added successfully" });


          this.GetCommonSpaceGroup(this.BatchId)

        }

      }, function (rejection) {

      })

  }


  GetCommonSpaceGroup(BatchId: number) {

    this.objCommonSpaceService.GetCommonSpaceGroup(BatchId)
      .subscribe((response) => {

        if (response != null) {
          this.ListGroups=response
        }


      }, function (rejection) {

      })

  }


  DeleteCommonSpaceFile(objCommonSpaceFile: CommonSpaceFile) {

    this.objCommonSpaceService.DeleteCommonSpaceFile(objCommonSpaceFile)
      .subscribe((response) => {

        this.messageService.add({ severity: 'success', summary: 'Success', detail: " Content Deleted successfully" });
        this.GetCommonSpaceGroup(this.BatchId);

      }, function (rejection) {

      })

  }









  AddNote(group: CommonSpaceGroup, note: BatchNote) {

    let objFile = new CommonSpaceFile()

    objFile.FileName = note.NoteTile
    objFile.ContentType = 2
    objFile.BatchId = this.BatchId
    objFile.CommonSpaceGroupId = group.CommonSpaceGroupId
    objFile.NoteId = note.BatchNoteId
    objFile.FileExtension = ""
    objFile.FolderName = ""
    objFile.FileSize = 0
    objFile.FileURL = ""
    objFile.ContainerName = ""
    
    objFile.CreatedBy = this.loggedInUser.UserId

    this.objCommonSpaceService.AddCommonSpaceNote(objFile)
      .subscribe((response) => {
        this.objCommonSpaceService.ShareBatchNote(group.CommonSpaceGroupStudent, group.BatchId, note.BatchNoteId)
          .subscribe((response) => {

            this.messageService.add({ severity: 'success', summary: 'Success', detail: " Note Added successfully" });

          }, function (rejection) {

          })

      }, function (rejection) {

      })
  }



  ViewFile(file: CommonSpaceFile) {
    if (file.ContentType == 2) {
      this.Viewnote = new BatchNote()
      this.Viewnote.BatchFileId = file.BatchFileId
      this.Viewnote.BatchId = file.BatchId
      this.Viewnote.BatchNoteId = file.NoteId
      this.Viewnote.NoteBody = file.NoteBody
    }
  }



  goToFileNote(BatchId: number, BatchFileId: number, BatchNoteId: number) {
    this.router.navigate(['/coursedetail', BatchId, { BatchFileId: BatchFileId, BatchNoteId: BatchNoteId }])
  }

}
