

IF OBJECT_ID ( 'LMS_GetGroupMeetings', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetGroupMeetings;
GO
CREATE PROCEDURE LMS_GetGroupMeetings
(
	@BatchId				INT  ,
	@UserId					INT
)
AS

Select 
GroupMeeting.GroupMeetingId
,	GroupMeeting.BatchId
,	ZoomMeetingId
,	StartUrl
,	JoinUrl
,	UUID
,	HostId
,	HostEmail
,	Topic
,	Status
,	StartTime
,	Duration
,	Password
,	CreatedBy
from GroupMeeting
INNER JOIN GroupMeetingStudent ON GroupMeeting.GroupMeetingId=GroupMeetingStudent.GroupMeetingId
where GroupMeeting.BatchId=@BatchId AND UserId=@UserId
AND CONVERT(date ,StartTime)>=CONVERT(date ,GETUTCDATE())

	
GO

