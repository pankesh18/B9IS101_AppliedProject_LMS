

IF OBJECT_ID ( 'LMS_AddGroupMeeting', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_AddGroupMeeting;
GO
CREATE PROCEDURE LMS_AddGroupMeeting
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
,@StudentList IdList readonly
)
AS

Declare @v_GroupMeeting  int


insert into GroupMeeting
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

set @v_GroupMeeting = @@IDENTITY


insert into GroupMeetingStudent(BatchId, GroupMeetingId, UserId)
select @BatchId, @v_GroupMeeting, Id from @StudentList

select @v_GroupMeeting

	
GO

