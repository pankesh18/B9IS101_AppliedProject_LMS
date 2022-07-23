




/*
exec LMS_CreateBatch 'batch 6', '2022', 'curse 4', @StudentId
*/
IF OBJECT_ID ( 'LMS_UpdateBatchNote', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_UpdateBatchNote;
GO
CREATE PROCEDURE LMS_UpdateBatchNote
(
@BatchNoteId				INT  
,@NoteTile				NVARCHAR(MAX)
,@ReferenceType			INT
,@BatchFileId			INT=null
,@BatchMeetingId		INT=null
,@NoteBody				NVARCHAR(MAX)
)
AS


UPDATE BatchNote
SET NoteTile=@NoteTile
,ReferenceType=@ReferenceType
,BatchFileId=@BatchFileId
,BatchMeetingId=@BatchMeetingId
,NoteBody=@NoteBody
WHERE BatchNoteId=@BatchNoteId

GO

