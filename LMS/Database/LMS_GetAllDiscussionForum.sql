

/*

*/
IF OBJECT_ID ( 'LMS_GetAllDiscussionForum', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetAllDiscussionForum;
GO
CREATE PROCEDURE LMS_GetAllDiscussionForum
(
	@BatchId INT,
	@UserId INT
)
AS




IF Exists (Select * from LMSUser where UserId=@UserId and UserType=2)
begin


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
INNER JOIN BatchStudent BS ON B.BatchId=BS.BatchId
INNER JOIN LMSUser U ON FQ.CreatedBy= U.UserId
where BS.UserId=@UserId and ( FQ.BatchId=@BatchId or @BatchId=0)



end
else

begin

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
where B.CreatedBy=@UserId and ( FQ.BatchId=@BatchId or @BatchId=0)

end




GO

