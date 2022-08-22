using LMS_Library;
using LMS_Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Repository
{
    public static class LMSUserRepository
    {
        public static bool CheckUserExists(DatabaseService objdatabaseService, string UserEmail)
        {
            try
            {
                bool IsExists = false;
                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("Email", UserEmail);

                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_CheckUserExists";
                command.CommandType = CommandType.StoredProcedure;

                IsExists= Convert.ToBoolean(command.ExecuteScalar());

                return IsExists;

            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }



        public static void Register(DatabaseService objdatabaseService, LMSUser objLMSUser)
        {
            try
            {
                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("FirstName", objLMSUser.FirstName);
                objdatabaseService.AddParameter("LastName", objLMSUser.LastName);
                objdatabaseService.AddParameter("Email", objLMSUser.Email);
                objdatabaseService.AddParameter("GoogleUserId", objLMSUser.GoogleUserId);
                objdatabaseService.AddParameter("UserType", objLMSUser.UserType);
                objdatabaseService.AddParameter("Gender", objLMSUser.Gender);
                objdatabaseService.AddParameter("ProfilePic", objLMSUser.ProfilePic);

                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_CreateUser";
                command.CommandType = CommandType.StoredProcedure;


                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : "+ ex.Message);
            }

        }

        public static LMSUser LoginUser(DatabaseService objdatabaseService, string UserEmail, string GoogleUserId)
        {
            try
            {
                LMSUser objLMSUser = null;
                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("Email", UserEmail);
                objdatabaseService.AddParameter("GoogleUserId", GoogleUserId);

                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_LoginUser";
                command.CommandType = CommandType.StoredProcedure;
                using (DbDataReader reader=command.ExecuteReader(CommandBehavior.CloseConnection))
                {
                    if (reader.HasRows)
                    {
                        objLMSUser= new LMSUser();
                        while (reader.Read())
                        {
                            objLMSUser.UserId = Convert.ToInt32(reader["UserId"]);
                            objLMSUser.FirstName = reader["FirstName"].ToString();
                            objLMSUser.LastName = reader["LastName"].ToString();
                            objLMSUser.Email = reader["Useremail"].ToString();
                            objLMSUser.Gender = Convert.ToInt32(reader["Gender"]);
                            objLMSUser.UserType = Convert.ToInt32(reader["UserType"]);
                            objLMSUser.ProfilePic = Convert.ToString(reader["ProfilePic"]);
                            objLMSUser.GoogleUserId = Convert.ToString(reader["GoogleUserId"]);

                        }
                    }
                }

                return objLMSUser;

            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }


        public static LMSUser GetUserDetails(DatabaseService objdatabaseService, int UserId)
        {
            try
            {
                LMSUser objLMSUser = null;
                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("UserId", UserId);

                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_GetUserDetails";
                command.CommandType = CommandType.StoredProcedure;
                using (DbDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection))
                {
                    if (reader.HasRows)
                    {
                        objLMSUser = new LMSUser();
                        while (reader.Read())
                        {
                            objLMSUser.UserId = Convert.ToInt32(reader["UserId"]);
                            objLMSUser.FirstName = reader["FirstName"].ToString();
                            objLMSUser.LastName = reader["LastName"].ToString();
                            objLMSUser.Email = reader["Useremail"].ToString();
                            objLMSUser.Gender = Convert.ToInt32(reader["Gender"]);
                            objLMSUser.UserType = Convert.ToInt32(reader["UserType"]);

                        }
                    }
                }

                return objLMSUser;

            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }

    }

    

}
