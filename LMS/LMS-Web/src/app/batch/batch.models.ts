import { LMSUser } from "../auth/auth.models"

export class Batch {
  BatchId: number
  BatchName: string
  BatchYear: any
  CourseName: string
  IsGroupMeetingAllowed: boolean
  CreatedBy: number
  BatchStudents: LMSUser[]
}



export class StudentMeeting {
  BatchMeetingId: number
    BatchId           : number
  BatchName: string
  BatchYear: string
  CourseName: string
  UserId: number
    ZoomMeetingId     : string
  StartUrl: string
  JoinUrl: string
  UUID: string
  HostId: string
  HostEmail: string
  Topic: string
  Status: string
  StartTime: Date
  Duration: number
  Timezone: string
  Password: string
  CreatedBy: number
}


export class BatchFiles {
  BatchFileId: number
  BatchId: number
  FileName: string
  FileExtension: string 
  ContainerName: string
  FileURL: string
  isURL: string
  FileSize: string
  Caption: string
  FileType: string
  IsNotes: boolean
  IsNoteList: boolean
  CreatedBy: number
}

export class GroupMeeting {
  GroupMeetingId: number
  BatchId: number
  BatchName: string
  BatchYear: string
  CourseName: string
  ZoomMeetingId: string
  StartUrl: string
  JoinUrl: string
  UUID: string
  HostId: string
  HostEmail: string
  Topic: string
  Status: string
  StartTime: Date
  Duration: number
  Timezone: string
  Password: string
  CreatedBy: number
  GroupMeetingStudents: LMSUser[]
  StudentListString: string
}
