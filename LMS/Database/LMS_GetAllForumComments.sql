

/*

*/
IF OBJECT_ID ( 'LMS_GetAllForumComments', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetAllForumComments;
GO
CREATE PROCEDURE LMS_GetAllForumComments
(
	@ForumQuestionId INT,
	@BatchId INT
)
AS

select 
FC.ForumCommentId,
FC.ForumQuestionId,
FC.BatchId,
B.BatchName,
CommentBody,
FC.CreatedBy,
U.FirstName,
U.LastName,
U.ProfilePic,
FC.CreatedDate
from ForumComment FC
INNER JOIN Batch B ON FC.BatchId=B.BatchId
INNER JOIN LMSUser U ON FC.CreatedBy= U.UserId
where FC.ForumQuestionId=@ForumQuestionId
AND (FC.BatchId=@BatchId OR @BatchId=0)

GO

