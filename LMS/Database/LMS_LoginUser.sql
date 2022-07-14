

IF OBJECT_ID ( 'LMS_LoginUser', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_LoginUser;
GO
CREATE PROCEDURE LMS_LoginUser
(
	@Email NVARCHAR(MAX),
	@password NVARCHAR(MAX)
)
AS

select 
UserId,Useremail,	Userpassword,	FirstName,	LastName,	Gender,	UserType
from LMSUser where Useremail=@Email and Userpassword=@password
   
GO

