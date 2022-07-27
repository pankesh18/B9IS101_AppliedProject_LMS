




/*
exec LMS_CreateBatch 'batch 6', '2022', 'curse 4', @StudentId
*/
IF OBJECT_ID ( 'LMS_ShareBatchNote', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_ShareBatchNote;
GO
CREATE PROCEDURE LMS_ShareBatchNote
(
@BatchId				INT  
,@BatchNoteId			INT
,@UserId			 IdList readonly

)
AS




INSERT INTO SharedNote
(
BatchId				
,BatchNoteId				
,UserId			
			
)
select
@BatchId
,@BatchNoteId	
,Id
 from @UserId			
 where Id not in (select userid from SharedNote where BatchNoteId=@BatchNoteId)


GO

