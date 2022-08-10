

/*

*/
IF OBJECT_ID ( 'LMS_GetAllDiscussionForum', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetAllDiscussionForum;
GO
CREATE PROCEDURE LMS_GetAllDiscussionForum
(
	@BatchId INT
)
AS

select 
ForumQuestionId,
FQ.BatchId,
B.BatchName,
QuestionBody,
FQ.CreatedBy,
U.FirstName,
U.LastName,
U.ProfilePic,
CreatedDate
from ForumQuestion FQ
INNER JOIN Batch B ON FQ.BatchId=B.BatchId
INNER JOIN LMSUser U ON FQ.CreatedBy= U.UserId
where FQ.BatchId=@BatchId or @BatchId=0

GO

