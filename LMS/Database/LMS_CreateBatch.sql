




/*
declare @StudentId IdList

insert into @StudentId
select 1

insert into @StudentId
select 2

exec LMS_CreateBatch 'batch 6', '2022', 'curse 4', @StudentId
*/
IF OBJECT_ID ( 'LMS_CreateBatch', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_CreateBatch;
GO
CREATE PROCEDURE LMS_CreateBatch
(
	@BatchName NVARCHAR(MAX),
	@BatchYear NVARCHAR(MAX),
	@CourseName NVARCHAR(MAX),
	@CreatedBy INT,
	@IsGroupMeetingAllowed bit,
	@StudentId IdList readonly
)
AS
Declare @v_BatchId int;

	insert into Batch(	BatchName,	BatchYear,	CourseName, CreatedBy, IsGroupMeetingAllowed)
	values
	(
	@BatchName
	,@BatchYear
	,@CourseName
	,@CreatedBy
	,@IsGroupMeetingAllowed
	)


	set @v_BatchId= @@IDENTITY

	

	insert into BatchStudent(BatchId, UserId)
	SELECT @v_BatchId,Id from @StudentId

   select @v_BatchId as BatchId
GO

