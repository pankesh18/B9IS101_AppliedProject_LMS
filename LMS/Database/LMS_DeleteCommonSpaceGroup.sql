

IF OBJECT_ID ( 'LMS_DeleteCommonSpaceGroup', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_DeleteCommonSpaceGroup;
GO
CREATE PROCEDURE LMS_DeleteCommonSpaceGroup
(
	@CommonSpaceGroupId				INT  

)
AS

DELETE CommonSpaceGroupStudent WHERE CommonSpaceGroupId=@CommonSpaceGroupId


DELETE CommonSpaceGroup WHERE  CommonSpaceGroupId=@CommonSpaceGroupId
	
GO

