




/*
exec LMS_CreateBatch 'batch 6', '2022', 'curse 4', @StudentId
*/
IF OBJECT_ID ( 'LMS_AddFilesToBatch', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_AddFilesToBatch;
GO
CREATE PROCEDURE LMS_AddFilesToBatch
(
@BatchId	INT
,@FileName	NVARCHAR(MAX)
,@FileExtension	NVARCHAR(MAX)
,@ContainerName	NVARCHAR(MAX)
,@FileURL	NVARCHAR(MAX)
,@isURL	BIT
,@FileSize	NVARCHAR(MAX)
,@Caption	NVARCHAR(MAX)
)
AS

INSERT INTO BatchFile
(
BatchId	
,[FileName]	
,FileExtension
,ContainerName	
,FileURL
,isURL
,FileSize
,Caption
)
values
(
@BatchId
,@FileName
,@FileExtension
,@ContainerName
,@FileURL
,@isURL
,@FileSize
,@Caption
)

GO

