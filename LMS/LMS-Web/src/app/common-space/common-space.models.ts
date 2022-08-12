import { LMSUser } from "../auth/auth.models"

export class CommonSpaceGroup {
  CommonSpaceGroupId: number
  BatchId: number
  GroupName: string
  CommonSpaceGroupStudent: LMSUser[]
  Files: CommonSpaceFile[] = [];
}


export class CommonSpaceFile {
  CommonSpaceFileId: number
  FileName:string
  ContentType: number
  BatchId: number
  BatchName: string
  CommonSpaceGroupId: number
  NoteId: number
  NoteBody: string
  BatchFileId: number
  FileURL: string
  FileExtension: string
  ContainerName: string
  FolderName: string
  FileSize: number
  CreatedBy: number
  CreatedDate: Date
}
