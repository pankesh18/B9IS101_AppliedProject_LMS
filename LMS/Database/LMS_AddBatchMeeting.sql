

IF OBJECT_ID ( 'LMS_AddBatchMeeting', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_AddBatchMeeting;
GO
CREATE PROCEDURE LMS_AddBatchMeeting
(
	@BatchId				INT  
,@ZoomMeetingId			NVARCHAR(MAX) 
,@StartUrl				NVARCHAR(MAX)
,@JoinUrl				NVARCHAR(MAX)
,@UUID					NVARCHAR(MAX)
,@HostId					NVARCHAR(MAX)	
,@HostEmail				NVARCHAR(MAX)	
,@Topic					NVARCHAR(MAX)
,@Status				NVARCHAR(MAX)
,@StartTime				Datetime
,@Duration				INT
,@Password				NVARCHAR(MAX)
,@CreatedBy INT
)
AS

insert into BatchMeeting
(
BatchId				
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
,CreatedBy
)
values
(
@BatchId				
,@ZoomMeetingId			
,@StartUrl				
,@JoinUrl				
,@UUID					
,@HostId					
,@HostEmail				
,@Topic					
,@Status				
,@StartTime				
,@Duration				
,@Password
,@CreatedBy
)

	
GO

