

IF OBJECT_ID ( 'LMS_CreateUser', 'P' ) IS NOT NULL
    DROP PROCEDURE LMS_CreateUser;
GO
CREATE PROCEDURE LMS_CreateUser
(
    @FirstName NVARCHAR(MAX	),
	@LastName NVARCHAR(MAX),
	@Email NVARCHAR(MAX),
	@password NVARCHAR(MAX),
	@UserType NVARCHAR(MAX),
	@Gender NVARCHAR(MAX)
)
AS


	insert into LMSUser(Useremail,	Userpassword,	FirstName,	LastName,	Gender,	UserType)
	values
	(
	@Email
	,@password
	,@FirstName
	,@LastName
	,@Gender
	,@UserType
	)
   
GO

