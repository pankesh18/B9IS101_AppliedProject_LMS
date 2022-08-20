

IF OBJECT_ID ( 'LMS_AddCommonSpaceFile', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_AddCommonSpaceFile;
GO
CREATE PROCEDURE LMS_AddCommonSpaceFile
(
@FileName					NVARCHAR(MAX)
,@ContentType				INT 
,@BatchId					INT 
,@CommonSpaceGroupId		INT 
,@NoteId					INT 
,@FileURL					NVARCHAR(MAX)
,@FileExtension				NVARCHAR(MAX)
,@ContainerName				NVARCHAR(MAX)
,@FolderName				NVARCHAR(MAX)
,@FileSize					NVARCHAR(MAX)
,@CreatedBy					INT 
)
AS

INSERT INTO CommonSpaceFile
(
[FileName]				
,[ContentType]			
,BatchId				
,CommonSpaceGroupId	
,NoteId				
,FileURL				
,FileExtension			
,ContainerName			
,FolderName				
,FileSize				
,CreatedBy				
,CreatedDate
)
values
(
@FileName				
,@ContentType			
,@BatchId				
,@CommonSpaceGroupId	
,@NoteId				
,@FileURL				
,@FileExtension			
,@ContainerName			
,@FolderName			
,@FileSize				
,@CreatedBy	
,GETDATE()
)

	
GO

