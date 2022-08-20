




/*

*/
IF OBJECT_ID ( 'LMS_PostForumComment', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_PostForumComment;
GO
CREATE PROCEDURE LMS_PostForumComment
(
	@ForumQuestionId INT,
	@BatchId INT,
	@CommentBody NVARCHAR(MAX),
	@CreatedBy INT
)
AS

	insert into ForumComment(ForumQuestionId,	BatchId,	CommentBody,	CreatedBy, CreatedDate)
	values
	(
	@ForumQuestionId
	,@BatchId
	,@CommentBody
	,@CreatedBy
	,GETDATE()
	)

GO

