




/*
exec LMS_CreateBatch 'batch 6', '2022', 'curse 4', @StudentId
*/
IF OBJECT_ID ( 'LMS_GetAllMeetingsByBatchId', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetAllMeetingsByBatchId;
GO
CREATE PROCEDURE LMS_GetAllMeetingsByBatchId
(
@BatchId	INT
)
AS
(
SELECT BatchMeetingId
, BatchId
,	ZoomMeetingId
,	StartUrl
,	JoinUrl
,	UUID
,	HostId
,	HostEmail
,	Topic
,	[Status]
,	StartTime
,	Duration
,	[Password]
,CreatedBy
 FROM BatchMeeting WHERE BatchId=@BatchId

)

GO

