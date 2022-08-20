
/*
Exec LMS_AddCommonSpaceGroupNote 3,1
*/
IF OBJECT_ID ( 'LMS_AddCommonSpaceGroupNote', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_AddCommonSpaceGroupNote;
GO
CREATE PROCEDURE LMS_AddCommonSpaceGroupNote
(
	@BatchId				INT  ,
	@CommonSpaceGroupId		INT,
	@ContentType			INT
)
AS




GO

