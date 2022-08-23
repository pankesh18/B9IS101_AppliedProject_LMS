




/*
exec LMS_CreateBatch 'batch 6', '2022', 'curse 4', @StudentId
*/
IF OBJECT_ID ( 'LMS_CheckUserExists', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_CheckUserExists;
GO
CREATE PROCEDURE LMS_CheckUserExists
(
@Email				NVARCHAR(MAX)
)
AS

IF Exists(select * from LMSUser Where Useremail=@Email)
BEGIN
SELECT Cast( 1 as bit)
END
else
BEGIN
SELECT Cast( 0 as bit)
END

GO

