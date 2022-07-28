




/*
exec LMS_GetBatchNotes 1,1,5,0
*/
IF OBJECT_ID ( 'LMS_GetBatchNotes', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetBatchNotes;
GO
CREATE PROCEDURE LMS_GetBatchNotes
(
@BatchId				INT  
,@UserId			INT
,@FileId			INT=0
,@MeetingId			 INT =0

)
AS
			
select 
BatchNoteId
,BatchNote.BatchId
,NoteTile
,ReferenceType
,BatchNote.BatchFileId
,CONCAT(BatchFile.FileName ,BatchFile.FileExtension) as [FileName]
,BatchNote.BatchMeetingId
,BatchMeeting.Topic
,BatchMeeting.StartTime
,NoteBody,BatchNote.CreatedBy
,null as OwnerName
,null as OwnerEmail
from
BatchNote
left join BatchMeeting on BatchNote.BatchMeetingId=BatchMeeting.BatchMeetingId
left join BatchFile on BatchNote.BatchFileId=BatchFile.BatchFileId
where BatchNote.BatchId=@BatchId and BatchNote.CreatedBy=@UserId 
and (BatchNote.BatchFileId=@FileId or (@FileId=0 AND @MeetingId<>0)) and (BatchNote.BatchMeetingId=@MeetingId or (@MeetingId=0 AND @FileId<>0))

union

select 
BatchNote.BatchNoteId
,BatchNote.BatchId
,NoteTile
,ReferenceType
,BatchNote.BatchFileId
,CONCAT(BatchFile.FileName ,BatchFile.FileExtension) as [FileName]
,BatchNote.BatchMeetingId
,BatchMeeting.Topic
,BatchMeeting.StartTime
,NoteBody,BatchNote.CreatedBy
,(Concat(LMSUser.FirstName,' ', LMSUser.LastName))as SharedBy
,LMSUser.Useremail as OwnerEmail
from 
BatchNote
inner join SharedNote on BatchNote.BatchId=SharedNote.BatchId and BatchNote.BatchNoteId =SharedNote.BatchNoteId 
inner join LMSUser on BatchNote.CreatedBy=LMSUser.UserId
left join BatchMeeting on BatchNote.BatchMeetingId=BatchMeeting.BatchMeetingId
left join BatchFile on BatchNote.BatchFileId=BatchFile.BatchFileId
where SharedNote.BatchId=@BatchId and SharedNote.UserId=@UserId
and (BatchNote.BatchFileId=@FileId or (@FileId=0 AND @MeetingId<>0)) and (BatchNote.BatchMeetingId=@MeetingId or (@MeetingId=0 AND @FileId<>0))

GO



