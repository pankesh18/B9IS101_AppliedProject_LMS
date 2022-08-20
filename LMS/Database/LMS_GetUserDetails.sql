/*

exec LMS_GetUserDetails 4

*/
IF OBJECT_ID ( 'LMS_GetUserDetails', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_GetUserDetails;
GO
CREATE PROCEDURE LMS_GetUserDetails
(
	@UserId Int
)
AS

select 
UserId
,Useremail
,FirstName
,LastName
,Gender
,ProfilePic
,UserType

from
LMSUser
where   UserId= @UserId



GO

