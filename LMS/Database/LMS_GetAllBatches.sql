

IF OBJECT_ID ( 'LMS_GetAllBatches', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetAllBatches;
GO
CREATE PROCEDURE LMS_GetAllBatches

AS

select BatchId,	BatchName,	BatchYear,	CourseName
from Batch
  



GO

