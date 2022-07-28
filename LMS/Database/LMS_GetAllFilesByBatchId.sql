




/*
exec LMS_CreateBatch 'batch 6', '2022', 'curse 4', @StudentId
*/
IF OBJECT_ID ( 'LMS_GetAllFilesByBatchId', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetAllFilesByBatchId;
GO
CREATE PROCEDURE LMS_GetAllFilesByBatchId
(
@BatchId	INT
)
AS
(
SELECT  BatchFileId,	BatchId,	[FileName],	FileExtension,	ContainerName,	FileURL,isURL	,FileSize,	Caption, CreatedBy
 FROM BatchFile WHERE BatchId=@BatchId
)

GO

