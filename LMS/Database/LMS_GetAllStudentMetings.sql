/*

exec LMS_GetAllStudentMetings 4

*/
IF OBJECT_ID ( 'LMS_GetAllStudentMetings', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetAllStudentMetings;
GO
CREATE PROCEDURE LMS_GetAllStudentMetings
(
	@StudentUserId Int
)
AS

select 
b.BatchId
,BatchName
,BatchYear
,CourseName
,UserId
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
from batch b
inner join batchstudent bs on b.batchid=bs.batchid
inner join BatchMeeting BM on b.batchid=BM.batchid
where   bs.userId= @StudentUserId



GO

