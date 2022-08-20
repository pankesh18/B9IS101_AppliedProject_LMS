/*
exec LMS_GetGroupMeetings 0, 6
*/
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
GM.GroupMeetingId
,	GM.BatchId
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
,	GM.CreatedBy
,	B.BatchName
,	B.BatchYear
,	B.CourseName
from GroupMeeting GM
INNER JOIN BATCH B ON GM.BatchId=B.BatchId
INNER JOIN GroupMeetingStudent ON GM.GroupMeetingId=GroupMeetingStudent.GroupMeetingId
where (GM.BatchId=@BatchId OR @BatchId=0) AND UserId=@UserId
AND CONVERT(date ,StartTime)>=CONVERT(date ,GETUTCDATE())

	
GO


