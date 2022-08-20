using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS_Library;
using LMS_Models;
using LMS_Repository;

namespace LMS_Service
{
    public class LMSUserService
    {
        enum env : int
        {
            dev = 0,
            prod = 1
        }

        static string[] DBStrings = {
                @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin",
                @"Server=tcp:dbs-lms-db.database.windows.net,1433;Initial Catalog=db-lms;Persist Security Info=False;User ID=pankesh;Password=p@s$1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
        };
        string DBConnectionString = DBStrings[Convert.ToInt32(env.prod)];

        public void Register(LMSUser objLMSUser)
        {
            try
            {
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    LMSUserRepository.Register(objdatabaseService, objLMSUser);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }



        public LMSUser LoginUser(string UserEmail, string GoogleUserId)
        {
            try
            {
                LMSUser loggedInUser;
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    loggedInUser = LMSUserRepository.LoginUser(objdatabaseService, UserEmail, GoogleUserId);
                }
                return loggedInUser;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }



        public LMSUser GetUserDetails(int UserId)
        {
            try
            {
                LMSUser loggedInUser;
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    loggedInUser = LMSUserRepository.GetUserDetails(objdatabaseService, UserId);
                }
                return loggedInUser;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }
    }
}
