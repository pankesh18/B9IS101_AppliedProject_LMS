

IF OBJECT_ID ( 'LMS_GetAllStudentBatches', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetAllStudentBatches;
GO
CREATE PROCEDURE LMS_GetAllStudentBatches
(
	@StudentUserId Int
)
AS

select B.BatchId,	B.BatchName,	B.BatchYear,	B.CourseName, B.CreatedBy
from Batch B
inner join BatchStudent BS ON B.BatchId=BS.BatchId
where BS.UserId=@StudentUserId
   
 


GO

