/*

exec LMS_GetBatchMeetingDetails 4

*/
IF OBJECT_ID ( 'LMS_GetBatchMeetingDetails', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetBatchMeetingDetails;
GO
CREATE PROCEDURE LMS_GetBatchMeetingDetails
(
	@BatchMeetingId Int
)
AS

select 
BatchMeetingId
,BatchId
,ZoomMeetingId
,StartUrl
,JoinUrl
,UUID
,HostId
,HostEmail
,Topic
,[Status]
,StartTime
,Duration
,[Password]
from
BatchMeeting
where   BatchMeetingId= @BatchMeetingId



GO

