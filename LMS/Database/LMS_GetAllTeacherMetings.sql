/*

exec LMS_GetAllTeacherMetings 4

*/
IF OBJECT_ID ( 'LMS_GetAllTeacherMetings', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetAllTeacherMetings;
GO
CREATE PROCEDURE LMS_GetAllTeacherMetings
(
	@UserId Int
)
AS

select 
b.BatchId
,BatchMeetingId
,BatchName
,BatchYear
,CourseName
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
,BM.CreatedBy
from batch b
inner join BatchMeeting BM on b.batchid=BM.batchid
where   b.CreatedBy= @UserId
AND CONVERT(date ,StartTime)>=CONVERT(date ,GETUTCDATE())


GO

