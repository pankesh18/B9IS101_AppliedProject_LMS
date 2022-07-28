




/*
declare @StudentId IdList

insert into @StudentId
select 1

insert into @StudentId
select 2

exec LMS_CreateBatch 'batch 6', '2022', 'curse 4', @StudentId
*/
IF OBJECT_ID ( 'LMS_UpdateBatch', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_UpdateBatch;
GO
CREATE PROCEDURE LMS_UpdateBatch
(
	@BatchName NVARCHAR(MAX),
	@BatchYear NVARCHAR(MAX),
	@CourseName NVARCHAR(MAX),
	@IsGroupMeetingAllowed bit,
	@BatchId Int
)
AS

Update Batch
set BatchName=@BatchName
, BatchYear= @BatchYear
,CourseName=@CourseName
,IsGroupMeetingAllowed=@IsGroupMeetingAllowed
where BatchId=@BatchId

GO

