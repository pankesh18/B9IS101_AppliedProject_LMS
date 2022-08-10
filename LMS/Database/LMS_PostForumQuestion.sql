




/*

*/
IF OBJECT_ID ( 'LMS_PostForumQuestion', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_PostForumQuestion;
GO
CREATE PROCEDURE LMS_PostForumQuestion
(
	@BatchId INT,
	@QuestionBody NVARCHAR(MAX),
	@CreatedBy INT
)
AS

	insert into ForumQuestion(	BatchId,	QuestionBody,	CreatedBy, CreatedDate)
	values
	(
	@BatchId
	,@QuestionBody
	,@CreatedBy
	,GETDATE()
	)

GO

