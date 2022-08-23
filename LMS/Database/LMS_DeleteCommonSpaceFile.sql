




/*

*/
IF OBJECT_ID ( 'LMS_DeleteCommonSpaceFile', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_DeleteCommonSpaceFile;
GO
CREATE PROCEDURE LMS_DeleteCommonSpaceFile
(
	@CommonSpaceFileId INT
)
AS
begin
Delete CommonSpaceFile where CommonSpaceFileId=@CommonSpaceFileId
end
GO

