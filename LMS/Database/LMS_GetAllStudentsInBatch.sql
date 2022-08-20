




/*
exec LMS_GetAllStudentsInBatch 1
*/
IF OBJECT_ID ( 'LMS_GetAllStudentsInBatch', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetAllStudentsInBatch;
GO
CREATE PROCEDURE LMS_GetAllStudentsInBatch
(
@BatchId				INT  


)
AS

	

select 
LMSUser.UserId
,Useremail
,FirstName
,LastName
,Gender	
,ProfilePic
,UserType
from LMSUser 
INNER JOIN BatchStudent on LMSUser.UserId=BatchStudent.UserId
where UserType=2 and BatchId=@BatchId

GO

