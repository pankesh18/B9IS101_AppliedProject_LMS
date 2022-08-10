using LMS_Library;
using LMS_Models;
using LMS_Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Service
{
    public class ForumService
    {

        public void PostForumQuestion(ForumQuestion objForumQuestion)
        {

            try
            {
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    ForumRepository.PostForumQuestion(objdatabaseService, objForumQuestion);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }

        }



        public void DeleteForumQuestion(ForumQuestion objForumQuestion)
        {

            try
            {
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    ForumRepository.DeleteForumQuestion(objdatabaseService, objForumQuestion);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }

        }
        public void PostForumComment(ForumComment objForumComment)
        {

            try
            {
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    ForumRepository.PostForumComment(objdatabaseService, objForumComment);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }

        }
        public void DeleteForumComment(ForumComment objForumComment)
        {

            try
            {
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    ForumRepository.DeleteForumComment(objdatabaseService, objForumComment);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }

        }


        public List<ForumQuestion> GetAllDiscussionForum(int BatchId,int UserId)
        {

            try
            {
                List<ForumQuestion> forumQuestions = new List<ForumQuestion>();
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    forumQuestions=ForumRepository.GetAllDiscussionForum(objdatabaseService, BatchId, UserId);


                    if (forumQuestions.Count > 0)
                    {
                        foreach(var Question in forumQuestions)
                        {
                            Question.forumComments = ForumRepository.GetAllForumComments(objdatabaseService, BatchId, Question.ForumQuestionId);
                        }
                    }

                }
                return forumQuestions;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }

        }


    }
}
