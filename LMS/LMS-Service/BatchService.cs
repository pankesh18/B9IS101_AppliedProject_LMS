﻿using LMS_Library;
using LMS_Models;
using LMS_Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Service
{
    public class BatchService
    {
        public int CreateBatch(Batch objBatch)
        {
            int BatchId;
            try
            {
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    BatchId=BatchRepository.CreateBatch(objdatabaseService, objBatch);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
            return BatchId;
        }


        public List<LMSUser> GetAllStudents()
        {
            try
            {
                List<LMSUser> objStudents=null;
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objStudents = BatchRepository.GetAllStudents(objdatabaseService);
                }
                return objStudents;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }


        public List<Batch> GetAllBatches()
        {
            try
            {
                List<Batch> objBatches = null;
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objBatches = BatchRepository.GetAllBatches(objdatabaseService);
                }
                return objBatches;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }


        public List<Batch> GetAllStudentBatches(int StudentUserId)
        {
            try
            {
                List<Batch> objBatches = null;
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objBatches = BatchRepository.GetAllStudentBatches(objdatabaseService, StudentUserId);
                }
                return objBatches;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }



        public async Task AddMeeting(int BatchId, string HostEmail, string  Topic, DateTime StartTime)
        {
            BatchMeeting objBatchMeeting;
            try
            {
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                ZoomService objZoomService = new ZoomService();

                string ZoomMeetingUrl= "https://api.zoom.us/v2/users/{userId}/meetings";
                string token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InNWVURYdElCUmEtQW9Vbm9VZ281d3ciLCJleHAiOjE2NTgyNjk3MjgsImlhdCI6MTY1NzY2NDkyOH0.zTNdjxy5QXq_d5vNWMDOvXYS07KkyfYkJiekLpLmvE0";

                ZoomMeetingUrl= ZoomMeetingUrl.Replace("{userId}", HostEmail);


                objBatchMeeting = await objZoomService.CreateZoomMeetingAsync(ZoomMeetingUrl, token, Topic, StartTime);

                objBatchMeeting.BatchId = BatchId;
                


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    BatchRepository.AddMeeting(objdatabaseService, objBatchMeeting);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
            
        }




        public List<StudentMeeting> GetAllStudentMetings(int StudentUserId)
        {
            try
            {
                List<StudentMeeting> objStudentMeeting = null;
                string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objStudentMeeting = BatchRepository.GetAllStudentMetings(objdatabaseService, StudentUserId);
                }
                return objStudentMeeting;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }

    }
}