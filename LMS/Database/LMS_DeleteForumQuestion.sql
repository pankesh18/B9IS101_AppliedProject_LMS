

/*

*/
IF OBJECT_ID ( 'LMS_DeleteForumQuestion', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_DeleteForumQuestion;
GO
CREATE PROCEDURE LMS_DeleteForumQuestion
(
	@ForumQuestionId INT,
	@UserId INT
)
AS

DELETE ForumQuestion WHERE ForumQuestionId=@ForumQuestionId and CreatedBy=@UserId

GO

