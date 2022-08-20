

IF OBJECT_ID ( 'LMS_GetBatchDetails', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetBatchDetails;
GO
CREATE PROCEDURE LMS_GetBatchDetails
(
	@BatchId Int
)
AS

select B.BatchId,	B.BatchName,	B.BatchYear,	B.CourseName, B.CreatedBy, IsGroupMeetingAllowed
from Batch B
where BatchId=@BatchId
   
 


GO

