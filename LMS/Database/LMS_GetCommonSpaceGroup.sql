

IF OBJECT_ID ( 'LMS_GetCommonSpaceGroup', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetCommonSpaceGroup;
GO
CREATE PROCEDURE LMS_GetCommonSpaceGroup
(
	@BatchId				INT  

)
AS


select 
CommonSpaceGroupId,	BatchId,	GroupName
from CommonSpaceGroup
where BatchId=@BatchId	

GO

