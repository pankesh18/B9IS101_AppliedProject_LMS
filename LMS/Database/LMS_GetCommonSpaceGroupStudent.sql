

IF OBJECT_ID ( 'LMS_GetCommonSpaceGroupStudent', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetCommonSpaceGroupStudent;
GO
CREATE PROCEDURE LMS_GetCommonSpaceGroupStudent
(
	@BatchId				INT  ,
	@CommonSpaceGroupId		INT

)
AS


select 
L.FirstName
,l.Gender
,l.GoogleUserId
,l.LastName
,l.ProfilePic
,l.Useremail
,l.UserId
,l.UserType
from CommonSpaceGroupStudent C
INNER JOIN LMSUser L ON C.UserId=L.UserId
where C.BatchId=@BatchId	AND C.CommonSpaceGroupId=@CommonSpaceGroupId

GO

