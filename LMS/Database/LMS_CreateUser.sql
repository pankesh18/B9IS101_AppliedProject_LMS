

IF OBJECT_ID ( 'LMS_CreateUser', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_CreateUser;
GO
CREATE PROCEDURE LMS_CreateUser
(
    @FirstName NVARCHAR(MAX	),
	@LastName NVARCHAR(MAX),
	@Email NVARCHAR(MAX),
	@GoogleUserId NVARCHAR(MAX),
	@UserType NVARCHAR(MAX),
	@Gender NVARCHAR(MAX),
	@ProfilePic NVARCHAR(MAX)
)
AS


	insert into LMSUser(Useremail,	GoogleUserId,	FirstName,	LastName,	Gender,	UserType, ProfilePic)
	values
	(
	@Email
	,@GoogleUserId
	,@FirstName
	,@LastName
	,@Gender
	,@UserType
	,@ProfilePic
	)
   
GO

