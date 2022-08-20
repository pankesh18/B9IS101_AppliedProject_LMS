using LMS_Library;
using LMS_Models;
using LMS_Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace LMS_Service
{
    public class BatchService
    {
        enum env :int
        {
            dev = 0,
            prod = 1
        }

        static string[] DBStrings = {
                @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin",
                @"Server=tcp:dbs-lms-db.database.windows.net,1433;Initial Catalog=db-lms;Persist Security Info=False;User ID=pankesh;Password=p@s$1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
        };

        string DBConnectionString= DBStrings[Convert.ToInt32(env.prod)];

        public int CreateBatch(Batch objBatch)
        {

 

        int BatchId;
            try
            {
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

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
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

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


        public List<Batch> GetAllBatches(int UserId)
        {
            try
            {
                List<Batch> objBatches = null;
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objBatches = BatchRepository.GetAllBatches(objdatabaseService, UserId);
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
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

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



        public async Task AddMeeting(int BatchId, string HostEmail, string  Topic, DateTime StartTime, int CreatedBy)
        {
            BatchMeeting objBatchMeeting;
            try
            {
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;
                ZoomService objZoomService = new ZoomService();

                string ZoomMeetingUrl= "https://api.zoom.us/v2/users/{userId}/meetings";
                string token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InNWVURYdElCUmEtQW9Vbm9VZ281d3ciLCJleHAiOjE2NjcxNzQzNDAsImlhdCI6MTY2MDE0MzAyMn0.2JANZuAq85UZyPFUhSBWmM-8YQJEVb12hvPpuEx6pWA";

                ZoomMeetingUrl= ZoomMeetingUrl.Replace("{userId}", HostEmail);


                objBatchMeeting = await objZoomService.CreateZoomMeetingAsync(ZoomMeetingUrl, token, Topic, StartTime);

                objBatchMeeting.BatchId = BatchId;
                objBatchMeeting.CreatedBy=CreatedBy;


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
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

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

        public List<StudentMeeting> GetAllTeacherMetings(int UserId)
        {
            try
            {
                List<StudentMeeting> objStudentMeeting = null;
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objStudentMeeting = BatchRepository.GetAllTeacherMetings(objdatabaseService, UserId);
                }
                return objStudentMeeting;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }


        public BatchFiles AddFilesToBatch(HttpContext objhttpcontext)
        {
            BatchFiles objBatchFiles= new BatchFiles();
            try
            {
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

                string ContainerName = "lmsbatchcontainer";

                objBatchFiles.FileName = objhttpcontext.Request.Form["FileName"].ToString();
                objBatchFiles.Caption = objhttpcontext.Request.Form["Caption"].ToString();
                objBatchFiles.BatchId = Convert.ToInt32(objhttpcontext.Request.Form["BatchId"]);
                objBatchFiles.CreatedBy = Convert.ToInt32(objhttpcontext.Request.Form["CreatedBy"]);
                objBatchFiles.isURL= Convert.ToBoolean(objhttpcontext.Request.Form["isURL"]);


                if (objBatchFiles.isURL)
                {
                    objBatchFiles.FileURL = objhttpcontext.Request.Form["URL"].ToString();
                    objBatchFiles.FileSize = String.Empty;
                    objBatchFiles.FileExtension = String.Empty;
                    objBatchFiles.ContainerName = String.Empty;
                }
                else
                {
                    objBatchFiles.FileSize = objhttpcontext.Request.Form["FileSize"].ToString();
                    objBatchFiles.FileExtension = objhttpcontext.Request.Form["FileExtension"].ToString();


                    CloudStorageService objCloudStorageService = new CloudStorageService(ContainerName);
                    System.IO.Stream httpPostedFile = objhttpcontext.Request.Files["File"].InputStream;

                    objCloudStorageService.UploadFromStream(objBatchFiles.FileName + objBatchFiles.FileExtension, httpPostedFile);
                    string FileURL = "https://lmsbatchstorage.blob.core.windows.net/" + ContainerName + "/" + objBatchFiles.FileName + objBatchFiles.FileExtension;

                    objBatchFiles.ContainerName = ContainerName;
                    objBatchFiles.FileURL = FileURL;
                }




                                

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    BatchRepository.AddFilesToBatch(objdatabaseService, objBatchFiles);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
            return objBatchFiles;
        }








        public List<StudentMeeting> GetAllMeetingsByBatchId(int BatchId)
        {
            try
            {
                List<StudentMeeting> objStudentMeeting = null;
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objStudentMeeting = BatchRepository.GetAllMeetingsByBatchId(objdatabaseService, BatchId);
                }
                return objStudentMeeting;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }

        public List<BatchFiles> GetAllFilesByBatchId(int BatchId)
        {
            try
            {
                List<BatchFiles> objBatchFiles = null;
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objBatchFiles = BatchRepository.GetAllFilesByBatchId(objdatabaseService, BatchId);
                }
                return objBatchFiles;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }



        public StudentMeeting GetBatchMeetingDetails(int BatchMeetingId)
        {
            try
            {
                StudentMeeting objStudentMeeting = null;
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objStudentMeeting = BatchRepository.GetBatchMeetingDetails(objdatabaseService, BatchMeetingId);
                }
                return objStudentMeeting;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }

        public void UpdateBatch(Batch objBatch)
        {

            try
            {
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    BatchRepository.UpdateBatch(objdatabaseService, objBatch);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
  
        }

        public Batch GetBatchDetails(int BatchId)
        {
            try
            {
                Batch objBatches = null;
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objBatches = BatchRepository.GetBatchDetails(objdatabaseService, BatchId);
                    objBatches.BatchStudents= BatchRepository.GetAllStudentsByBatchId(objdatabaseService, BatchId);
                }
                return objBatches;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }



        public async Task<GroupMeeting> StartGroupMeeting(GroupMeeting objGroupMeeting)
        {
            BatchMeeting objBatchMeeting;

            try
            {
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

                ZoomService objZoomService = new ZoomService();

                string ZoomMeetingUrl = "https://api.zoom.us/v2/users/{userId}/meetings";
                string token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InNWVURYdElCUmEtQW9Vbm9VZ281d3ciLCJleHAiOjE2NTk0NTQ3MzIsImlhdCI6MTY1ODg0OTkzM30.OjbJGHDDlKTY2gzWAFYdqvEkejjZ0dSNcFlUUfiS3lA";

                ZoomMeetingUrl = ZoomMeetingUrl.Replace("{userId}", "wadekar.pankesh@gmail.com");

                objGroupMeeting.StartTime = System.DateTime.Now;

                // var isExists = await objZoomService.CheckUserExistsAsync(objGroupMeeting.HostEmail, token);


                objBatchMeeting = await objZoomService.CreateZoomMeetingAsync(ZoomMeetingUrl, token, objGroupMeeting.Topic, objGroupMeeting.StartTime);

                objGroupMeeting.ZoomMeetingId = objBatchMeeting.ZoomMeetingId;
                objGroupMeeting.StartUrl = objBatchMeeting.StartUrl;
                objGroupMeeting.JoinUrl = objBatchMeeting.JoinUrl;
                objGroupMeeting.UUID = objBatchMeeting.UUID;
                objGroupMeeting.HostId = objBatchMeeting.HostId;
                objGroupMeeting.Topic = objBatchMeeting.Topic;
                objGroupMeeting.Status = objBatchMeeting.Status;
                objGroupMeeting.StartTime = objBatchMeeting.StartTime;
                objGroupMeeting.Duration = objBatchMeeting.Duration;
                objGroupMeeting.Password = objBatchMeeting.Password;


                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objGroupMeeting= BatchRepository.AddGroupMeeting(objdatabaseService, objGroupMeeting);
                }
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
            return objGroupMeeting;
        }


        public List<GroupMeeting> GetGroupMeetings(int BatchId, int UserId)
        {
            try
            {
                List<GroupMeeting> objGroupMeeting = null;
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objGroupMeeting = BatchRepository.GetGroupMeetings(objdatabaseService, BatchId, UserId);



                }
                if (objGroupMeeting!=null && objGroupMeeting.Count > 0)
                {
                    using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                    {
                        foreach (var GroupMeeting in objGroupMeeting)
                        {
                            GroupMeeting.GroupMeetingStudents = BatchRepository.GetGroupMeetingStudents(objdatabaseService, GroupMeeting.GroupMeetingId);

                        }
                    }
                }
                
                return objGroupMeeting;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }

        public GroupMeeting GetGroupMeetingDetails(int GroupMeetingId)
        {
            try
            {
                GroupMeeting objGroupMeeting = null;
                //string connectionString = @"Data Source=LAPTOP-N8VFBQPV\MSSQLSERVER01;Initial Catalog=B9IS101_LMS; User ID=sqladmin;Password=sqladmin";
                string connectionString = DBConnectionString;

                using (DatabaseService objdatabaseService = new DatabaseService(connectionString))
                {

                    objGroupMeeting = BatchRepository.GetGroupMeetingDetails(objdatabaseService, GroupMeetingId);
                }
                return objGroupMeeting;
            }
            catch (Exception ex)
            {
                throw new ServiceLayerException(ex, "Service Layer Exception : " + ex.Message);
            }
        }
    }
}
