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
        public static void Register(DatabaseService objdatabaseService, LMSUser objLMSUser)
        {
            try
            {
                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("FirstName", objLMSUser.FirstName);
                objdatabaseService.AddParameter("LastName", objLMSUser.LastName);
                objdatabaseService.AddParameter("Email", objLMSUser.Email);
                objdatabaseService.AddParameter("password", objLMSUser.password);
                objdatabaseService.AddParameter("UserType", objLMSUser.UserType);
                objdatabaseService.AddParameter("Gender", objLMSUser.Gender);

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

        public static LMSUser LoginUser(DatabaseService objdatabaseService, string UserEmail, string UserPassword)
        {
            try
            {
                LMSUser objLMSUser = null;
                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("Email", UserEmail);
                objdatabaseService.AddParameter("password", UserPassword);

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
                            objLMSUser.FirstName = reader["FirstName"].ToString();
                            objLMSUser.LastName = reader["LastName"].ToString();
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
