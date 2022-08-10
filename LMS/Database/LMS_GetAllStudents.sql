

IF OBJECT_ID ( 'LMS_GetAllStudents', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetAllStudents;
GO
CREATE PROCEDURE LMS_GetAllStudents

AS

select UserId,	Useremail,		FirstName,	LastName	,Gender	,	UserType
from LMSUser where UserType=2
  

GO

