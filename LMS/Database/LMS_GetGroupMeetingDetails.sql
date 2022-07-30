/*

exec LMS_GetBatchMeetingDetails 4

*/
IF OBJECT_ID ( 'LMS_GetGroupMeetingDetails', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetGroupMeetingDetails;
GO
CREATE PROCEDURE LMS_GetGroupMeetingDetails
(
	@GroupMeetingId Int
)
AS

select 
GroupMeetingId
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
from
GroupMeeting
where   GroupMeetingId= @GroupMeetingId



GO

