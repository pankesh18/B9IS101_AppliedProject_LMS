
/*
Exec LMS_GetCommonSpaceGroupFile 3,1
*/
IF OBJECT_ID ( 'LMS_GetCommonSpaceGroupFile', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetCommonSpaceGroupFile;
GO
CREATE PROCEDURE LMS_GetCommonSpaceGroupFile
(
	@BatchId				INT  ,
	@CommonSpaceGroupId		INT

)
AS


select 
CF.CommonSpaceFileId
,CF.[FileName]			
,CF.[ContentType]		
,CF.BatchId			
,CF.CommonSpaceGroupId
,CF.NoteId
,BN.NoteBody
,BN.BatchFileId
,CF.FileURL			
,CF.FileExtension		
,CF.ContainerName		
,CF.FolderName			
,CF.FileSize			
,CF.CreatedBy			
,CF.CreatedDate		

from CommonSpaceFile CF
Left Join BatchNote BN ON CF.NoteId=BN.BatchNoteId
where CF.BatchId=@BatchId	AND CF.CommonSpaceGroupId=@CommonSpaceGroupId

GO

