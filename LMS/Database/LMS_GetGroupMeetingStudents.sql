

IF OBJECT_ID ( 'LMS_GetGroupMeetingStudents', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetGroupMeetingStudents;
GO
CREATE PROCEDURE LMS_GetGroupMeetingStudents
(
	@GroupMeetingId				INT  
)
AS

select 
LMSUser.UserId
,LMSUser.Useremail
,LMSUser.FirstName
,LMSUser.LastName
,LMSUser.Gender
,LMSUser.UserType
,LMSUser.ProfilePic
from GroupMeetingStudent 
INNER JOIN LMSUser ON GroupMeetingStudent.UserId=LMSUser.UserId
where GroupMeetingId=@GroupMeetingId
	



GO

