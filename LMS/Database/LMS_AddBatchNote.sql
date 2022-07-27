




/*
exec LMS_CreateBatch 'batch 6', '2022', 'curse 4', @StudentId
*/
IF OBJECT_ID ( 'LMS_AddBatchNote', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_AddBatchNote;
GO
CREATE PROCEDURE LMS_AddBatchNote
(
@BatchId				INT  
,@NoteTile				NVARCHAR(MAX)
,@ReferenceType			INT
,@BatchFileId			INT=null
,@BatchMeetingId		INT=null
,@NoteBody				NVARCHAR(MAX)
,@CreatedBy				INT
)
AS

INSERT INTO BatchNote
(
BatchId				
,[NoteTile]				
,ReferenceType			
,BatchFileId			
,BatchMeetingId			
,NoteBody	
,CreatedBy
)
values
(
@BatchId
,@NoteTile			
,@ReferenceType			
,@BatchFileId			
,@BatchMeetingId			
,@NoteBody
,@CreatedBy
)

GO

