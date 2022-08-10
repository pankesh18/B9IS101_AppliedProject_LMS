

/*

*/
IF OBJECT_ID ( 'LMS_DeleteForumComment', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_DeleteForumComment;
GO
CREATE PROCEDURE LMS_DeleteForumComment
(
	@ForumCommentId INT,
	@UserId INT
)
AS

DELETE ForumComment WHERE ForumCommentId=@ForumCommentId and CreatedBy=@UserId

GO

