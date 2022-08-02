

IF OBJECT_ID ( 'LMS_LoginUser', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_LoginUser;
GO
CREATE PROCEDURE LMS_LoginUser
(
	@Email NVARCHAR(MAX),
	@GoogleUserId NVARCHAR(MAX)
)
AS

select 
UserId,Useremail,	FirstName,	LastName,	Gender,	UserType,ProfilePic, GoogleUserId
from LMSUser where Useremail=@Email and GoogleUserId=@GoogleUserId
   
GO

