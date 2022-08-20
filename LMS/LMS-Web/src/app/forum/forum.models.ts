import { LMSUser } from "../auth/auth.models"

export class ForumQuestion {
  ForumQuestionId: number
  BatchId: number
  BatchName: string
  QuestionBody: string
  sanitizedBody:any
  CreatedBy: LMSUser
  CreatedDate: Date
  forumComments: ForumComment[]
  NewReply: any;
}


export class ForumComment {
  ForumCommentId: number
  ForumQuestionId: number
  BatchId: number
  BatchName: number
  CommentBody: string
  sanitizedBody: any
  CreatedBy: LMSUser
  CreatedDate: Date
}
