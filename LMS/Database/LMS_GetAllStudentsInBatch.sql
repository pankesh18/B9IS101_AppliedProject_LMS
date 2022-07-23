




/*
exec LMS_GetBatchNotes 1,1,5,0
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
,Userpassword
,FirstName
,LastName
,Gender	
,ProfilePic
,UserType
from LMSUser 
INNER JOIN BatchStudent on LMSUser.UserId=BatchStudent.UserId
where UserType=2 and BatchId=@BatchId

GO

