

IF OBJECT_ID ( 'LMS_AddCommonSpaceGroup', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_AddCommonSpaceGroup;
GO
CREATE PROCEDURE LMS_AddCommonSpaceGroup
(
	@BatchId				INT  
,@GroupName			NVARCHAR(MAX) 
,@StudentList IdList readonly
)
AS

Declare @v_CommonSpaceGroupId  int


INSERT INTO CommonSpaceGroup
(
BatchId				
,GroupName			
)
values
(
@BatchId				
,@GroupName
)

set @v_CommonSpaceGroupId = @@IDENTITY


insert into CommonSpaceGroupStudent(BatchId, CommonSpaceGroupId, UserId)
select @BatchId, @v_CommonSpaceGroupId, Id from @StudentList

select @v_CommonSpaceGroupId
	
GO

