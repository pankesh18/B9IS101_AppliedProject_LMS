

IF OBJECT_ID ( 'LMS_GetAllBatches', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetAllBatches;
GO
CREATE PROCEDURE LMS_GetAllBatches
(
@UserId Int
)
AS

select BatchId,	BatchName,	BatchYear,	CourseName, CreatedBy, IsGroupMeetingAllowed
from Batch
where CreatedBy=@UserId  



GO

