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
    public static class ForumRepository
    {
        public static void PostForumQuestion(DatabaseService objdatabaseService, ForumQuestion objForumQuestion)
        {

            try
            {


                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("BatchId", objForumQuestion.BatchId);
                objdatabaseService.AddParameter("QuestionBody", objForumQuestion.QuestionBody);
                objdatabaseService.AddParameter("CreatedBy", objForumQuestion.CreatedBy.UserId);


                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_PostForumQuestion";
                command.CommandType = CommandType.StoredProcedure;


                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }

        public static void DeleteForumQuestion(DatabaseService objdatabaseService, ForumQuestion objForumQuestion)
        {

            try
            {


                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("ForumQuestionId", objForumQuestion.ForumQuestionId);
                objdatabaseService.AddParameter("UserId", objForumQuestion.CreatedBy.UserId);


                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_DeleteForumQuestion";
                command.CommandType = CommandType.StoredProcedure;


                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }


        public static void PostForumComment(DatabaseService objdatabaseService, ForumComment objForumComment)
        {

            try
            {


                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("ForumQuestionId", objForumComment.ForumQuestionId);
                objdatabaseService.AddParameter("BatchId", objForumComment.BatchId);
                objdatabaseService.AddParameter("CommentBody", objForumComment.CommentBody);
                objdatabaseService.AddParameter("CreatedBy", objForumComment.CreatedBy.UserId);


                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_PostForumComment";
                command.CommandType = CommandType.StoredProcedure;


                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }



        public static void DeleteForumComment(DatabaseService objdatabaseService, ForumComment objForumComment)
        {

            try
            {


                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("ForumCommentId", objForumComment.ForumCommentId);
                objdatabaseService.AddParameter("UserId", objForumComment.CreatedBy.UserId);


                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_DeleteForumComment";
                command.CommandType = CommandType.StoredProcedure;


                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }

        public static List<ForumQuestion> GetAllDiscussionForum(DatabaseService objdatabaseService, int BatchId)
        {

            try
            {
                List<ForumQuestion> forumQuestions = new List<ForumQuestion>();


                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("BatchId", BatchId);


                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_GetAllDiscussionForum";
                command.CommandType = CommandType.StoredProcedure;


                using (DbDataReader reader = command.ExecuteReader(CommandBehavior.Default))
                {
                    if (reader.HasRows)
                    {

                        while (reader.Read())
                        {
                            ForumQuestion objForumQuestion = new ForumQuestion();
                            objForumQuestion.CreatedBy = new LMSUser();

                            objForumQuestion.ForumQuestionId = Convert.ToInt32(reader["ForumQuestionId"]);
                            objForumQuestion.BatchId = Convert.ToInt32(reader["BatchId"]);
                            objForumQuestion.BatchName = reader["BatchName"].ToString();
                            objForumQuestion.QuestionBody = Convert.ToString(reader["QuestionBody"]);
                            objForumQuestion.CreatedBy.UserId = Convert.ToInt32(reader["CreatedBy"]);
                            objForumQuestion.CreatedBy.FirstName = Convert.ToString(reader["FirstName"]);
                            objForumQuestion.CreatedBy.LastName = Convert.ToString(reader["LastName"]);
                            objForumQuestion.CreatedBy.ProfilePic = Convert.ToString(reader["ProfilePic"]);                         
                            objForumQuestion.CreatedDate = Convert.ToDateTime(reader["CreatedDate"]);

                            forumQuestions.Add(objForumQuestion);
                        }
                    }
                }

                return forumQuestions;
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }




        public static List<ForumComment> GetAllForumComments(DatabaseService objdatabaseService, int BatchId, int ForumQuestionId)
        {

            try
            {
                List<ForumComment> forumComments = new List<ForumComment>();   


                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("BatchId", BatchId);
                objdatabaseService.AddParameter("ForumQuestionId", ForumQuestionId);

                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_GetAllForumComments";
                command.CommandType = CommandType.StoredProcedure;


                using (DbDataReader reader = command.ExecuteReader(CommandBehavior.Default))
                {
                    if (reader.HasRows)
                    {

                        while (reader.Read())
                        {
                            ForumComment objForumComment = new ForumComment();
                            objForumComment.CreatedBy = new LMSUser();

                            objForumComment.ForumCommentId = Convert.ToInt32(reader["ForumCommentId"]);
                            objForumComment.ForumQuestionId = Convert.ToInt32(reader["ForumQuestionId"]);
                            objForumComment.BatchId = Convert.ToInt32(reader["BatchId"]);
                            objForumComment.BatchName = reader["BatchName"].ToString();
                            objForumComment.CommentBody = Convert.ToString(reader["CommentBody"]);
                            objForumComment.CreatedBy.UserId = Convert.ToInt32(reader["CreatedBy"]);
                            objForumComment.CreatedBy.FirstName = Convert.ToString(reader["FirstName"]);
                            objForumComment.CreatedBy.LastName = Convert.ToString(reader["LastName"]);
                            objForumComment.CreatedBy.ProfilePic = Convert.ToString(reader["ProfilePic"]);
                            objForumComment.CreatedDate = Convert.ToDateTime(reader["CreatedDate"]);

                            forumComments.Add(objForumComment);
                        }
                    }
                }

                return forumComments;
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }
    }
}
