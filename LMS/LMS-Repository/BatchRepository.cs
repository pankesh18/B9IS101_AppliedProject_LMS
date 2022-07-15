﻿using LMS_Library;
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
    public static class BatchRepository
    {
        public static int CreateBatch(DatabaseService objdatabaseService, Batch objBatch)
        {
            int BatchId = 0;
            try
            {

                //var StudentList = (from Id in objBatch.BatchStudents
                //                   select Id.UserId).ToList<IdList>();

                List<IdList> studentIdlist= new List<IdList>();
                foreach (var student in objBatch.BatchStudents)
                {
                    IdList idList = new IdList();
                    idList.Id = student.UserId;
                    studentIdlist.Add(idList);
                }

                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("BatchName", objBatch.BatchName);
                objdatabaseService.AddParameter("BatchYear", objBatch.BatchYear);
                objdatabaseService.AddParameter("CourseName", objBatch.CourseName);
                objdatabaseService.AddParameter("StudentId", studentIdlist.AsDataTable<IdList>());



                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_CreateBatch";
                command.CommandType = CommandType.StoredProcedure;


                BatchId= Convert.ToInt32(command.ExecuteScalar());
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }
            return BatchId;
        }




        public static List<LMSUser> GetAllStudents(DatabaseService objdatabaseService)
        {
            try
            {
                List<LMSUser> objStudents = null;
                LMSUser objLMSUser = null;
                objdatabaseService.ClearParameter();


                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_GetAllStudents";
                command.CommandType = CommandType.StoredProcedure;
                using (DbDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection))
                {
                    if (reader.HasRows)
                    {
                        objStudents=new List<LMSUser>();
                        
                        while (reader.Read())
                        {
                            objLMSUser = new LMSUser();
                            objLMSUser.UserId = Convert.ToInt32(reader["UserId"]);
                            objLMSUser.FirstName = reader["FirstName"].ToString();
                            objLMSUser.LastName = reader["LastName"].ToString();
                            objLMSUser.Email = reader["Useremail"].ToString();
                            objLMSUser.Gender = Convert.ToInt32(reader["Gender"]);
                            objLMSUser.UserType = Convert.ToInt32(reader["UserType"]);
                            objStudents.Add(objLMSUser);
                        }
                    }
                }

                return objStudents;

            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }


        public static List<Batch> GetAllBatches(DatabaseService objdatabaseService)
        {
            try
            {
                List<Batch> objBatches = null;
                Batch objBatch = null;
                objdatabaseService.ClearParameter();


                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_GetAllBatches";
                command.CommandType = CommandType.StoredProcedure;
                using (DbDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection))
                {
                    if (reader.HasRows)
                    {
                        objBatches = new List<Batch>();

                        while (reader.Read())
                        {
                            objBatch = new Batch();
                            objBatch.BatchId = Convert.ToInt32(reader["BatchId"]);
                            objBatch.BatchName = reader["BatchName"].ToString();
                            objBatch.BatchYear = reader["BatchYear"].ToString();
                            objBatch.CourseName = reader["CourseName"].ToString();
                            objBatches.Add(objBatch);
                        }
                    }
                }

                return objBatches;

            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }




        public static List<Batch> GetAllStudentBatches(DatabaseService objdatabaseService,int StudentUserId)
        {
            try
            {
                List<Batch> objBatches = null;
                Batch objBatch = null;
                objdatabaseService.ClearParameter();
                objdatabaseService.AddParameter("StudentUserId", StudentUserId);

                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_GetAllStudentBatches";
                command.CommandType = CommandType.StoredProcedure;
                using (DbDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection))
                {
                    if (reader.HasRows)
                    {
                        objBatches = new List<Batch>();

                        while (reader.Read())
                        {
                            objBatch = new Batch();
                            objBatch.BatchId = Convert.ToInt32(reader["BatchId"]);
                            objBatch.BatchName = reader["BatchName"].ToString();
                            objBatch.BatchYear = reader["BatchYear"].ToString();
                            objBatch.CourseName = reader["CourseName"].ToString();
                            objBatches.Add(objBatch);
                        }
                    }
                }

                return objBatches;

            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }


        public static void AddMeeting(DatabaseService objdatabaseService, BatchMeeting objBatchMeeting)
        {
            
            try
            {

                objdatabaseService.ClearParameter();

                objdatabaseService.AddParameter("BatchId", objBatchMeeting.BatchId);
                objdatabaseService.AddParameter("ZoomMeetingId", objBatchMeeting.ZoomMeetingId);
                objdatabaseService.AddParameter("StartUrl", objBatchMeeting.StartUrl);
                objdatabaseService.AddParameter("JoinUrl", objBatchMeeting.JoinUrl);
                objdatabaseService.AddParameter("UUID", objBatchMeeting.UUID);
                objdatabaseService.AddParameter("HostId", objBatchMeeting.HostId);
                objdatabaseService.AddParameter("HostEmail", objBatchMeeting.HostEmail);
                objdatabaseService.AddParameter("Topic", objBatchMeeting.Topic);
                objdatabaseService.AddParameter("Status", objBatchMeeting.Status);
                objdatabaseService.AddParameter("StartTime", objBatchMeeting.StartTime);
                objdatabaseService.AddParameter("Duration", objBatchMeeting.Duration);
                objdatabaseService.AddParameter("Password", objBatchMeeting.Password);
               



                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_AddBatchMeeting";
                command.CommandType = CommandType.StoredProcedure;


                command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }
           
        }




        public static List<StudentMeeting> GetAllStudentMetings(DatabaseService objdatabaseService, int StudentUserId)
        {
            try
            {
                List<StudentMeeting> objMeetings = null;
                StudentMeeting obj = null;
                objdatabaseService.ClearParameter();
                objdatabaseService.AddParameter("StudentUserId", StudentUserId);

                SqlCommand command = objdatabaseService.GetSQLCommand();

                command.CommandText = @"LMS_GetAllStudentMetings";
                command.CommandType = CommandType.StoredProcedure;
                using (DbDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection))
                {
                    if (reader.HasRows)
                    {
                        objMeetings = new List<StudentMeeting>();

                        while (reader.Read())
                        {
                            obj = new StudentMeeting();
                            obj.BatchId = Convert.ToInt32(reader["BatchId"]);
                            obj.BatchName = reader["BatchName"].ToString();
                            obj.BatchYear = reader["BatchYear"].ToString();
                            obj.CourseName = reader["CourseName"].ToString();
                            
                            obj.UserId = Convert.ToInt32(reader["UserId"]);
                            obj.ZoomMeetingId = reader["ZoomMeetingId"].ToString();
                            obj.StartUrl = reader["StartUrl"].ToString();
                            obj.JoinUrl = reader["JoinUrl"].ToString();
                            obj.UUID = reader["UUID"].ToString();
                            obj.HostId = reader["HostId"].ToString();
                            obj.HostEmail = reader["HostEmail"].ToString();
                            obj.Topic = reader["Topic"].ToString();
                            obj.Status = reader["Status"].ToString();
                            obj.StartTime = Convert.ToDateTime(reader["StartTime"]);
                            obj.Duration = Convert.ToInt32(reader["Duration"]);

                            objMeetings.Add(obj);
                        }
                    }
                }

                return objMeetings;

            }
            catch (Exception ex)
            {
                throw new DataLayerException(ex, "Data Layer Exception : " + ex.Message);
            }

        }


    }
}