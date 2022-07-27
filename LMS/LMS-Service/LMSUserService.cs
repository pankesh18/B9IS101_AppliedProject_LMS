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
        public void Register(LMSUser objLMSUser)
        {
            try
            {
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


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



        public LMSUser LoginUser(string UserEmail, string UserPassword)
        {
            try
            {
                LMSUser loggedInUser;
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    loggedInUser = LMSUserRepository.LoginUser(objdatabaseService, UserEmail, UserPassword);
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
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


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
